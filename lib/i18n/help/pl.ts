import type { HelpDictionary } from "@/lib/i18n/help/types";

export const helpPl: HelpDictionary = {
  meta: {
    title: "Pomoc i FAQ",
    description: "Odpowiedzi na najczęstsze pytania o Pantryx.",
  },
  eyebrow: "Centrum pomocy",
  heading: "Jak możemy pomóc?",
  lead: "Szybkie odpowiedzi na najczęstsze pytania. Dalej nie wiesz? Napisz do nas — czytamy każdą wiadomość.",
  groups: [
    {
      title: "Pierwsze kroki",
      items: [
        {
          q: "Czego potrzebuję, aby korzystać z Pantryx?",
          a: "iPhone’a z iOS 18 lub nowszym. Możesz zacząć od razu jako gość — bez konta — albo założyć darmowe konto Pantryx, aby zapisywać spiżarnię i synchronizować ją między urządzeniami. Karta nie jest wymagana.",
        },
        {
          q: "Czy mogę korzystać z Pantryx bez konta?",
          a: "Tak. Możesz wejść jako gość i od razu zacząć skanować i gotować. Załóż darmowe konto, gdy zechcesz zapisać spiżarnię, preferencje i historię gotowania, aby zostały z Tobą.",
        },
        {
          q: "Jeśli zacznę jako gość, czy zachowam dane po założeniu konta?",
          a: "Tak. Gdy zakładasz darmowe konto, spiżarnia i preferencje z sesji gościa zostają przeniesione, więc nie musisz zaczynać od zera.",
        },
        {
          q: "Gdzie pobiorę Pantryx?",
          a: "Pantryx jest darmowy w App Store na iPhone’a. Wyszukaj „Pantryx” lub użyj dowolnego przycisku „Pobierz” na tej stronie.",
        },
        {
          q: "Czy jest wersja na Androida?",
          a: "Jeszcze nie — na razie Pantryx działa tylko na iOS.",
        },
        {
          q: "Ile trwa skanowanie?",
          a: "Około 10 sekund — od otwarcia aparatu do zobaczenia rozpoznanej spiżarni.",
        },
      ],
    },
    {
      title: "Skanowanie",
      items: [
        {
          q: "Co, jeśli skaner coś pominie?",
          a: "Po skanowaniu zobaczysz ekran potwierdzenia. Dotknij, aby dodać, usunąć lub zmienić nazwę czegokolwiek, zanim dostaniesz pomysły na dania.",
        },
        {
          q: "Czy działa przy prawdziwej lodówce?",
          a: "Tak — właśnie do tego został stworzony. Nie musisz niczego układać.",
        },
      ],
    },
    {
      title: "Tryb gotowania",
      items: [
        {
          q: "Czy jest tryb gotowania z podpowiedziami?",
          a: "Tak. Tryb gotowania krok po kroku prowadzi Cię przez przepis jeden krok naraz, dużą, czytelną czcionką, więc łatwo go śledzić podczas gotowania.",
        },
      ],
    },
    {
      title: "Import z wideo",
      items: [
        {
          q: "Czy mogę zamienić wideo z przepisem na przepis?",
          a: "Tak. Wklej link do wideo kulinarnego, a Pantryx wyciągnie składniki i kroki, abyś mógł ugotować danie w aplikacji.",
        },
        {
          q: "Jakie platformy są obsługiwane?",
          a: "Wideo z TikToka, Instagram Reels i YouTube.",
        },
        {
          q: "Czy jest limit liczby importowanych wideo?",
          a: "Tak — możesz zaimportować do 10 wideo dziennie i 30 tygodniowo. Liczniki resetują się automatycznie, więc następnego dnia i następnego tygodnia znów masz pełny limit.",
        },
      ],
    },
    {
      title: "Przepisy i preferencje",
      items: [
        {
          q: "Czy mogę ustawić preferencje dietetyczne lub alergie?",
          a: "Tak. Ustaw preferencje, takie jak wegetarianizm, bezglutenowe lub konkretne alergie, a Pantryx odfiltruje propozycje dań, aby pasowały.",
        },
        {
          q: "Czy mogę zapisywać lub udostępniać przepisy?",
          a: "Tak. Oceń przepis, zapisz go w ulubionych lub udostępnij linkiem, aby inni też mogli go otworzyć.",
        },
      ],
    },
    {
      title: "Spiżarnia i lista zakupów",
      items: [
        {
          q: "Czym jest spiżarnia?",
          a: "Spiżarnia to bieżąca lista składników, które masz w domu. Pantryx tworzy ją automatycznie z Twoich skanów i to z nią porównywane są propozycje dań — więc przepisy, które widzisz, naprawdę ugotujesz od razu.",
        },
        {
          q: "Czy mogę edytować spiżarnię ręcznie?",
          a: "Tak. Dodawaj, zmieniaj nazwy lub usuwaj pozycje w spiżarni w dowolnej chwili — nie musisz skanować. Wszystko pozostaje w pełni pod Twoją kontrolą.",
        },
        {
          q: "Czym jest lista zakupów?",
          a: "Lista zakupów śledzi składniki, które jeszcze musisz kupić. Gdy przepis wymaga czegoś, czego nie ma w spiżarni, możesz dodać brakujące pozycje do listy zakupów przed gotowaniem.",
        },
        {
          q: "Jak pozycje trafiają na listę zakupów?",
          a: "Dodaj brakujące składniki z przepisu jednym dotknięciem albo dodaj cokolwiek ręcznie. Uzupełniając zapasy, przenoś pozycje do spiżarni, aby były gotowe na kolejne propozycje.",
        },
      ],
    },
    {
      title: "Konto i dane",
      items: [
        {
          q: "Czy moja spiżarnia synchronizuje się między urządzeniami?",
          a: "Tak — z darmowym kontem Twoja spiżarnia, preferencje i historia gotowania synchronizują się, więc są dostępne wszędzie tam, gdzie się zalogujesz.",
        },
        {
          q: "Jak usunąć moje dane?",
          a: "Ustawienia → Konto → Usuń konto. Twoja spiżarnia, historia i zdjęcia zostaną usunięte.",
        },
        {
          q: "Czy trenujecie modele AI na moich zdjęciach?",
          a: "Nie. Zdjęcia służą do rozpoznawania składników do Twojej spiżarni. Szczegóły znajdziesz w Polityce prywatności.",
        },
      ],
    },
    {
      title: "Rozwiązywanie problemów",
      items: [
        {
          q: "Skaner nie rozpoznaje moich produktów.",
          a: "Spróbuj lepszego oświetlenia i otwórz lodówkę do końca. Jeśli nadal ma problem, dodaj pozycje ręcznie — i napisz do nas, abyśmy mogli poprawić rozpoznawanie.",
        },
        {
          q: "Coś innego?",
          a: "Odezwij się — naprawdę czytamy każdą wiadomość.",
        },
      ],
    },
  ],
  stillStuck: {
    heading: "Dalej nie wiesz?",
    body: "Odpowiadamy w ciągu jednego–dwóch dni.",
  },
};
