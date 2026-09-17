import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { backendUrl } from "@/lib/backend";
import { fetchRecipePreview, parseShareableRecipeId } from "@/lib/recipe/recipePreview";
import { recipeLanguageFromQuery } from "@/lib/recipe/recipeLanguage";
import { recipeShareCopy } from "@/lib/recipe/recipeShareCopy";

const imageSize = { width: 1200, height: 630 };
const oneDayInSeconds = 86_400;

function StrokeIcon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <svg
      width={34}
      height={34}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

async function loadFont(text: string): Promise<ArrayBuffer | null> {
  const query = new URLSearchParams({ family: "Inter:wght@600", text });
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
    next: { revalidate: oneDayInSeconds * 30 },
  })
    .then((response) => (response.ok ? response.text() : ""))
    .catch(() => "");
  const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!fontUrl) return null;
  return fetch(fontUrl)
    .then((response) => (response.ok ? response.arrayBuffer() : null))
    .catch(() => null);
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const recipeId = parseShareableRecipeId((await params).id);
  if (recipeId === null) return new Response(null, { status: 404 });

  const language = recipeLanguageFromQuery(new URL(request.url).searchParams.get("lang"));
  const recipe = await fetchRecipePreview(recipeId, language);
  if (!recipe) return new Response(null, { status: 404 });

  const copy = recipeShareCopy[language];
  const minutesLabel = copy.minutes(Math.round(recipe.total_time));
  const servingsLabel = String(recipe.servings);
  const font = await loadFont(`${minutesLabel}${servingsLabel}${copy.previewBadge}`);

  const chipStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 26px",
    borderRadius: 999,
    fontSize: 34,
    color: "#ffffff",
    backgroundColor: "rgba(15, 15, 15, 0.64)",
  } as const;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", backgroundColor: "#2f3336" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${backendUrl}${recipe.image}`}
          alt=""
          width={imageSize.width}
          height={imageSize.height}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: 36, left: 36, display: "flex", gap: 14 }}>
          <div style={chipStyle}>
            <StrokeIcon color="#ffffff">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </StrokeIcon>
            {minutesLabel}
          </div>
          <div style={chipStyle}>
            <StrokeIcon color="#ffffff">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </StrokeIcon>
            {servingsLabel}
          </div>
        </div>
        <div
          style={{
            ...chipStyle,
            position: "absolute",
            right: 36,
            bottom: 36,
            color: "#1b1b1b",
            backgroundColor: "rgba(255, 255, 255, 0.94)",
          }}
        >
          <StrokeIcon color="#1b1b1b">
            <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
            <path d="M6 17h12" />
          </StrokeIcon>
          {copy.previewBadge}
        </div>
      </div>
    ),
    {
      ...imageSize,
      fonts: font ? [{ name: "Inter", data: font, weight: 600, style: "normal" }] : undefined,
      headers: {
        "Cache-Control": `public, max-age=${oneDayInSeconds}, s-maxage=${oneDayInSeconds * 7}, stale-while-revalidate=${oneDayInSeconds}`,
      },
    }
  );
}
