import { useEffect, useEffectEvent, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { SEARCH_DEBOUNCE_MS } from '@/config/constants.js';
import { useDebounce } from '@/hooks/useDebounce.js';

/**
 * Поле поиска. Запрос отправляется после паузы в наборе текста или по Enter.
 * @param {{ value: string, onSearch: (query: string) => void }} props
 */
export default function SearchInput({ value: query, onSearch }) {
  const [value, setValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  const debouncedValue = useDebounce(value, SEARCH_DEBOUNCE_MS);

  // Запрос изменился снаружи (например, кнопкой «Назад») — обновляем поле
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    if (query !== value.trim()) setValue(query);
  }

  const search = (nextQuery) => {
    if (nextQuery !== query) onSearch(nextQuery);
  };

  const onDebouncedChange = useEffectEvent((nextQuery) => search(nextQuery));

  useEffect(() => {
    onDebouncedChange(debouncedValue.trim());
  }, [debouncedValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(value.trim());
  };

  const handleClear = () => {
    setValue('');
    search('');
  };

  return (
    <Form role="search" onSubmit={handleSubmit}>
      <InputGroup size="sm">
        <Form.Control
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Поиск рецептов, например pasta"
          aria-label="Поиск рецептов"
          autoComplete="off"
        />
        {value && (
          <Button variant="outline-secondary" onClick={handleClear} aria-label="Очистить поиск">
            ×
          </Button>
        )}
        <Button type="submit" variant="primary">
          Найти
        </Button>
      </InputGroup>
    </Form>
  );
}
