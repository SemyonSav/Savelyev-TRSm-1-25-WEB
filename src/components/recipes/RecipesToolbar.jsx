import SortSelect from './SortSelect.jsx';

/**
 * Панель управления списком.
 * @param {{
 *   params: import('@/api/queryBuilder.js').ListParams,
 *   onChange: (patch: Partial<import('@/api/queryBuilder.js').ListParams>) => void,
 * }} props
 */
export default function RecipesToolbar({ params, onChange }) {
  return (
    <div className="recipes-toolbar">
      <div className="recipes-toolbar__sort">
        <SortSelect sort={params.sort} order={params.order} onChange={onChange} />
      </div>
    </div>
  );
}
