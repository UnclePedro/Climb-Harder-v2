const QuoteGenerator = () => {
  const quotesArray = [
    {
      quote:
        "A comfort zone is a beautiful place, but nothing ever grows there.",
      author: "John Assaraf",
    },
    {
      quote:
        "It's only after you've stepped out of your comfort zone that you begin to change, grow, and transform.",
      author: "Roy T. Bennett",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "Act as if what you do makes a difference. It does.",
      author: "William James",
    },
    {
      quote: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote:
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
    },
    {
      quote: "Don’t watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      quote: "Your time is limited, don’t waste it living someone else’s life.",
      author: "Steve Jobs",
    },
    {
      quote: "Start where you are. Use what you have. Do what you can.",
      author: "Arthur Ashe",
    },
    {
      quote: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    { quote: "What we think, we become.", author: "Buddha" },
    {
      quote: "If opportunity doesn’t knock, build a door.",
      author: "Milton Berle",
    },
    {
      quote: "Strive not to be a success, but rather to be of value.",
      author: "Albert Einstein",
    },
    {
      quote:
        "You are never too old to set another goal or to dream a new dream.",
      author: "C.S. Lewis",
    },
    {
      quote: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
    },
    {
      quote: "Don't wait. The time will never be just right.",
      author: "Napoleon Hill",
    },
    {
      quote: "Believe and act as if it were impossible to fail.",
      author: "Charles Kettering",
    },
    {
      quote:
        "Failure will never overtake me if my determination to succeed is strong enough.",
      author: "Og Mandino",
    },
    { quote: "We become what we think about.", author: "Earl Nightingale" },
    {
      quote: "It always seems impossible until it’s done.",
      author: "Nelson Mandela",
    },
    {
      quote: "Life is 10% what happens to us and 90% how we react to it.",
      author: "Charles R. Swindoll",
    },
    {
      quote: "With the new day comes new strength and new thoughts.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "The power of imagination makes us infinite.",
      author: "John Muir",
    },
    {
      quote: "Action is the foundational key to all success.",
      author: "Pablo Picasso",
    },
    {
      quote:
        "The only way to achieve the impossible is to believe it is possible.",
      author: "Charles Kingsleigh",
    },
    { quote: "The best way out is always through.", author: "Robert Frost" },
    {
      quote: "Success is not in what you have, but who you are.",
      author: "Bo Bennett",
    },
    {
      quote:
        "Your life does not get better by chance, it gets better by change.",
      author: "Jim Rohn",
    },
    {
      quote: "Small deeds done are better than great deeds planned.",
      author: "Peter Marshall",
    },
    {
      quote: "Great things never came from comfort zones.",
      author: "Ben Francia",
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      quote: "Take it to send-town.",
      author: "Harry Armitage Bath",
      source: "Harry",
    },
    {
      quote: "It's a hundred million degrees right now!",
      author: "Adam Ondra",
      source: "unknown YouTube video",
    },
    {
      quote:
        "You can't look at a problem, you've gotta look through a problem.",
      author: "Bugzy Malone",
      source: "Movin'",
    },
    {
      quote:
        "I'm tellin' my bro don't quit. Put in the work and your time will come.",
      author: "Central Cee",
      source: "Tension",
    },
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
  };

  const quote = getRandomQuote();

  return (
    <>
      <p className="text-sm w-42">
        '{quote.quote}' - {quote.author}
      </p>
    </>
  );
};

export default QuoteGenerator;
