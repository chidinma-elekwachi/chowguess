import { useMemo, useState } from 'react'
import './App.css'

type Meal = {
  name: string
  description: string
  time: string[]
  emoji: string
  ingredients: string[]
  allergens: string[]
  tag: string
}

const allergyOptions = [
  'Peanuts',
  'Tree nuts',
  'Dairy',
  'Eggs',
  'Wheat',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame',
]

const meals: Meal[] = [
  {
    name: 'Akara & pap',
    description: 'Crispy bean cakes with a smooth, comforting bowl of pap.',
    time: ['Breakfast', 'Snack'],
    emoji: '🫘',
    ingredients: ['black-eyed beans', 'pepper', 'onion', 'pap'],
    allergens: [],
    tag: 'Naija breakfast',
  },
  {
    name: 'Yam & egg sauce',
    description: 'Soft boiled yam with a rich, peppery tomato and egg sauce.',
    time: ['Breakfast', 'Lunch'],
    emoji: '🍠',
    ingredients: ['yam', 'eggs', 'tomato', 'pepper', 'onion'],
    allergens: ['Eggs'],
    tag: 'Home-style',
  },
  {
    name: 'Moi moi',
    description: 'A soft, savory steamed bean pudding with peppers and onions.',
    time: ['Breakfast', 'Lunch'],
    emoji: '🫔',
    ingredients: ['black-eyed beans', 'red pepper', 'onion', 'vegetable oil'],
    allergens: [],
    tag: 'Steamed & savory',
  },
  {
    name: 'Jollof rice',
    description: 'Party-style rice cooked in a smoky tomato and pepper sauce.',
    time: ['Lunch', 'Dinner'],
    emoji: '🍚',
    ingredients: ['rice', 'tomato', 'red pepper', 'onion', 'vegetable oil'],
    allergens: [],
    tag: 'A Naija classic',
  },
  {
    name: 'Beans & dodo',
    description: 'Hearty stewed beans served with sweet fried plantain.',
    time: ['Lunch', 'Dinner'],
    emoji: '🍌',
    ingredients: ['black-eyed beans', 'plantain', 'tomato', 'palm oil', 'onion'],
    allergens: [],
    tag: 'Sweet & hearty',
  },
  {
    name: 'Chicken suya',
    description: 'Spiced grilled chicken with onions and a little heat.',
    time: ['Lunch', 'Dinner'],
    emoji: '🍢',
    ingredients: ['chicken', 'ground peanuts', 'suya spice', 'onion'],
    allergens: ['Peanuts'],
    tag: 'Smoky & spicy',
  },
  {
    name: 'Nigerian fried rice',
    description: 'Colorful fried rice with mixed vegetables and chicken.',
    time: ['Lunch', 'Dinner'],
    emoji: '🥘',
    ingredients: ['rice', 'chicken', 'carrot', 'green peas', 'eggs', 'soy sauce'],
    allergens: ['Eggs', 'Soy'],
    tag: 'Colorful favorite',
  },
  {
    name: 'Efo riro',
    description: 'Rich spinach stew with peppers, beef and smoked fish.',
    time: ['Lunch', 'Dinner'],
    emoji: '🥬',
    ingredients: ['spinach', 'red pepper', 'beef', 'smoked fish', 'palm oil'],
    allergens: ['Fish'],
    tag: 'Rich & comforting',
  },
  {
    name: 'Egusi soup & eba',
    description: 'Melon-seed soup with beef, fish and cassava eba.',
    time: ['Lunch', 'Dinner'],
    emoji: '🥣',
    ingredients: ['egusi melon seeds', 'beef', 'smoked fish', 'crayfish', 'cassava'],
    allergens: ['Fish', 'Shellfish'],
    tag: 'Sunday favorite',
  },
  {
    name: 'Oha soup & fufu',
    description: 'A fragrant southeastern soup with tender meat and leafy oha.',
    time: ['Lunch', 'Dinner'],
    emoji: '🍲',
    ingredients: ['oha leaves', 'beef', 'dried fish', 'crayfish', 'cassava fufu'],
    allergens: ['Fish', 'Shellfish'],
    tag: 'Igbo comfort food',
  },
  {
    name: 'Amala, ewedu & gbegiri',
    description: 'A beloved combo of yam flour, silky ewedu and bean stew.',
    time: ['Lunch', 'Dinner'],
    emoji: '🍛',
    ingredients: ['yam flour', 'ewedu leaves', 'beans', 'beef', 'crayfish'],
    allergens: ['Shellfish'],
    tag: 'A proper combo',
  },
  {
    name: 'Boli & groundnuts',
    description: 'Smoky roasted plantain paired with crunchy groundnuts.',
    time: ['Snack'],
    emoji: '🍌',
    ingredients: ['plantain', 'groundnuts'],
    allergens: ['Peanuts'],
    tag: 'Street-food fave',
  },
  {
    name: 'Puff-puff',
    description: 'Golden, pillowy dough bites with just a touch of sweetness.',
    time: ['Breakfast', 'Snack'],
    emoji: '🍩',
    ingredients: ['wheat flour', 'yeast', 'sugar', 'water'],
    allergens: ['Wheat'],
    tag: 'Something sweet',
  },
  {
    name: 'Roasted plantain',
    description: 'Simple, smoky boli — sweet, filling and straight off the grill.',
    time: ['Snack'],
    emoji: '🔥',
    ingredients: ['plantain'],
    allergens: [],
    tag: 'Simple & smoky',
  },
  {
    name: 'Pepper soup',
    description: 'A light, spicy broth with fish or meat and aromatic spices.',
    time: ['Lunch', 'Dinner'],
    emoji: '🥣',
    ingredients: ['meat or fish', 'pepper', 'onion', 'spices'],
    allergens: ['Fish', 'Shellfish'],
    tag: 'Light & spicy',
  },
]

const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

function App() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
  const [customAllergy, setCustomAllergy] = useState('')
  const [mealTime, setMealTime] = useState('Lunch')
  const [suggestions, setSuggestions] = useState<Meal[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const allergyTerms = useMemo(
    () => [
      ...selectedAllergies.map((allergy) => allergy.toLowerCase()),
      ...customAllergy
        .split(',')
        .map((allergy) => allergy.trim().toLowerCase())
        .filter(Boolean),
    ],
    [customAllergy, selectedAllergies],
  )

  function toggleAllergy(allergy: string) {
    setSelectedAllergies((current) =>
      current.includes(allergy)
        ? current.filter((item) => item !== allergy)
        : [...current, allergy],
    )
  }

  function findMeals() {
    const safeMeals = meals.filter((meal) => {
      const matchesTime = meal.time.includes(mealTime)
      const searchableText = [...meal.allergens, ...meal.ingredients]
        .join(' ')
        .toLowerCase()
      const hasAllergen = allergyTerms.some((allergy) =>
        searchableText.includes(allergy),
      )
      return matchesTime && !hasAllergen
    })

    const shuffled = [...safeMeals].sort(() => Math.random() - 0.5)
    setSuggestions(shuffled.slice(0, Math.min(3, shuffled.length)))
    setHasSearched(true)
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Chowguess home">
          <span className="brand-mark" aria-hidden="true">c</span>
          chowguess<span className="brand-period">.</span>
        </a>
        <span className="topbar-note"><span className="sparkle">✳</span> Nigerian food ideas, made for you</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> NAIJA FLAVOUR, YOUR WAY</div>
          <h1>What sounds<br />good <span>today?</span></h1>
          <p className="hero-description">
            Tell us what to skip and when you’re eating. We’ll find a Nigerian
            meal idea at random, just for you.
          </p>
          <div className="hero-footnote"><span aria-hidden="true">✦</span> No accounts. No fuss. Just food ideas.</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-card">
            <span className="art-salad">🥗</span>
            <span className="art-leaf leaf-one">✿</span>
            <span className="art-leaf leaf-two">✳</span>
          </div>
          <span className="art-spark art-spark-one">✦</span>
          <span className="art-spark art-spark-two">✳</span>
          <span className="art-caption">made for your kind of hungry</span>
        </div>
      </section>

      <section className="picker" aria-labelledby="picker-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">LET’S MAKE IT A GOOD ONE</div>
            <h2 id="picker-title">Build your bite</h2>
          </div>
          <span className="step-label"><span>01</span> YOUR PREFERENCES</span>
        </div>

        <div className="picker-grid">
          <div className="preference-panel">
            <fieldset className="allergy-field">
              <legend><span className="legend-icon">♡</span> Any allergies to keep in mind?</legend>
              <p className="field-hint">Pick all that apply — we’ll leave them out.</p>
              <div className="allergy-list">
                {allergyOptions.map((allergy) => (
                  <button
                    className={`allergy-chip ${selectedAllergies.includes(allergy) ? 'selected' : ''}`}
                    type="button"
                    key={allergy}
                    aria-pressed={selectedAllergies.includes(allergy)}
                    onClick={() => toggleAllergy(allergy)}
                  >
                    {selectedAllergies.includes(allergy) && <span aria-hidden="true">✓</span>}
                    {allergy}
                  </button>
                ))}
              </div>
              <label className="custom-label" htmlFor="custom-allergy">Something else? Add it here</label>
              <input
                className="custom-input"
                id="custom-allergy"
                type="text"
                value={customAllergy}
                onChange={(event) => setCustomAllergy(event.target.value)}
                placeholder="e.g. coconut, kiwi"
              />
              <p className="input-note">Separate multiple ingredients with a comma.</p>
            </fieldset>

            <fieldset className="time-field">
              <legend><span className="legend-icon">◷</span> What time of day?</legend>
              <div className="time-options">
                {mealTimes.map((time) => (
                  <button
                    className={`time-option ${mealTime === time ? 'active' : ''}`}
                    type="button"
                    key={time}
                    aria-pressed={mealTime === time}
                    onClick={() => setMealTime(time)}
                  >
                    <span className="time-emoji" aria-hidden="true">
                      {time === 'Breakfast' ? '☀' : time === 'Lunch' ? '🌤' : time === 'Dinner' ? '🌙' : '🍊'}
                    </span>
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="suggest-button" type="button" onClick={findMeals}>
              Find my meal <span aria-hidden="true">↗</span>
            </button>
            <div className="privacy-note"><span aria-hidden="true">♧</span> Your preferences stay right here in your browser.</div>
          </div>

          <div className={`results-panel ${hasSearched ? 'has-results' : ''}`} aria-live="polite">
            {!hasSearched ? (
              <div className="empty-state">
                <div className="empty-illustration"><span>🍊</span><i>✦</i></div>
                <div className="empty-kicker">YOUR NEXT FAVORITE</div>
                <h3>A tasty idea<br />is just around the corner.</h3>
                <p>Choose your preferences and we’ll spin up a few ideas.</p>
                <div className="empty-stamp">FRESH<br />IDEAS <span>✳</span></div>
              </div>
            ) : suggestions.length ? (
              <div className="results-content">
                <div className="results-title">
                  <div>
                    <div className="eyebrow">A FEW IDEAS FOR YOU</div>
                    <h3>Your {mealTime.toLowerCase()} shortlist</h3>
                  </div>
                  <span className="result-count">{suggestions.length} found</span>
                </div>
                <div className="meal-list">
                  {suggestions.map((meal) => (
                    <article className="meal-card" key={meal.name}>
                      <div className="meal-emoji" aria-hidden="true">{meal.emoji}</div>
                      <div className="meal-info">
                        <span className="meal-tag">{meal.tag}</span>
                        <h4>{meal.name}</h4>
                        <p>{meal.description}</p>
                        <div className="ingredient-list">
                          {meal.ingredients.slice(0, 4).map((ingredient) => (
                            <span key={ingredient}>{ingredient}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <button className="again-button" type="button" onClick={findMeals}>
                  <span aria-hidden="true">⟳</span> Shuffle for more ideas
                </button>
                <p className="safety-note">Always check product labels and ask about cross-contact. These ideas aren’t medical advice.</p>
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🍽️</div>
                <div className="eyebrow">LET’S TRY A DIFFERENT TIME</div>
                <h3>No matches just yet.</h3>
                <p>We couldn’t find a meal for {mealTime.toLowerCase()} that matches those ingredients. Try changing your time or allergy list.</p>
                <button className="again-button" type="button" onClick={() => {
                  setSelectedAllergies([])
                  setCustomAllergy('')
                }}>
                  Clear allergies
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>Made with a little zest <span className="footer-heart">♥</span></span>
        <span>Good food should feel good.</span>
      </footer>
    </main>
  )
}

export default App
