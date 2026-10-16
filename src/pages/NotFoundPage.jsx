import NotFound from '@/components/common/NotFound.jsx';
import { APP_NAME } from '@/config/constants.js';

export default function NotFoundPage() {
  return (
    <>
      <title>{`Страница не найдена — ${APP_NAME}`}</title>
      <NotFound />
    </>
  );
}
