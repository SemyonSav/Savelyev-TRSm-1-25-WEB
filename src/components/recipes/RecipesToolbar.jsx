import PageSizeSelect from './PageSizeSelect.jsx';
import SearchInput from './SearchInput.jsx';
import SortSelect from './SortSelect.jsx';

/**
 * Панель управления списком.
 * @param {{
 *   params: import('@/api/queryBuilder.js').ListParams,
 *   onChange: (
 *     patch: Partial<import('@/api/queryBuilder.js').ListParams>,
 *     options?: { replace?: boolean },
 *   ) => void,
 * }} props
 */
export default function RecipesToolbar({ params, onChange }) {
  return (
    <div className="recipes-toolbar">
      <div className="recipes-toolbar__search">
        <SearchInput value={params.q} onSearch={(q) => onChange({ q }, { replace: true })} />
      </div>
      <div className="recipes-toolbar__sort">
        <SortSelect sort={params.sort} order={params.order} onChange={onChange} />
      </div>
      <div className="recipes-toolbar__size">
        <PageSizeSelect value={params.limit} onChange={(limit) => onChange({ limit })} />
      </div>
    </div>
  );
}
