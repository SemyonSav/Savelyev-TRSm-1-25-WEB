const DIFFICULTY_LABELS = {
  Easy: 'Легко',
  Medium: 'Средне',
  Hard: 'Сложно',
};

const DIFFICULTY_VARIANTS = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

/** @param {string} difficulty */
export function formatDifficulty(difficulty) {
  return DIFFICULTY_LABELS[difficulty] ?? difficulty;
}

/** @param {string} difficulty */
export function getDifficultyVariant(difficulty) {
  return DIFFICULTY_VARIANTS[difficulty] ?? 'secondary';
}

/**
 * 95 → «1 ч 35 мин»
 * @param {number} minutes
 */
export function formatMinutes(minutes) {
  if (!Number.isFinite(minutes)) return '—';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest} мин`;
  return rest === 0 ? `${hours} ч` : `${hours} ч ${rest} мин`;
}

/**
 * Склонение существительного после числа: plural(5, ['рецепт', 'рецепта', 'рецептов']).
 * @param {number} count
 * @param {[string, string, string]} forms
 */
export function plural(count, [one, few, many]) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
