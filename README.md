# Продуктовое дерево метрик

Приложение для управления продуктовыми областями, метриками и фичами мастер-плана с реал-тайм синхронизацией.

## Стек технологий

- **Frontend**: React 18.3 + TypeScript 5.5
- **Сборщик**: Vite 5.4
- **Стили**: Tailwind CSS 3.4
- **База данных**: Supabase (PostgreSQL + Realtime)
- **Иконки**: Lucide React

## Требования

- Node.js 18+ или Node.js 20+
- npm 9+ или yarn/pnpm

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <ваш-репозиторий>
cd <название-проекта>
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка Supabase

Создайте файл `.env` в корне проекта и добавьте данные вашего Supabase проекта:

```env
VITE_SUPABASE_URL=https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY=ваш-анон-ключ
```

**Где взять данные:**
1. Зайдите в [Supabase Dashboard](https://supabase.com/dashboard)
2. Создайте новый проект или откройте существующий
3. Перейдите в Settings → API
4. Скопируйте `Project URL` и `anon public` ключ

### 4. Применение миграций базы данных

Миграции находятся в папке `supabase/migrations/`. Примените их через Supabase Dashboard:

1. Откройте SQL Editor в вашем проекте Supabase
2. Выполните содержимое файла `supabase/migrations/20251126140732_create_product_tree_table.sql`

Или используйте Supabase CLI:

```bash
# Установка Supabase CLI (если не установлен)
npm install -g supabase

# Подключение к проекту
supabase link --project-ref ваш-проект-ref

# Применение миграций
supabase db push
```

### 5. Включение Realtime

Для работы реал-тайм синхронизации выполните в SQL Editor:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE product_tree_data;
```

### 6. Запуск проекта

#### Режим разработки

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

#### Сборка для продакшена

```bash
npm run build
```

Готовые файлы будут в папке `dist/`

#### Предпросмотр продакшен сборки

```bash
npm run preview
```

## Деплой

### Vercel

```bash
# Установка Vercel CLI
npm install -g vercel

# Деплой
vercel
```

Не забудьте добавить переменные окружения в настройках Vercel проекта!

### Netlify

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Деплой
netlify deploy --prod
```

Команда для сборки: `npm run build`
Папка для публикации: `dist`

### Другие платформы

Приложение совместимо с любым хостингом, поддерживающим статические сайты:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Структура проекта

```
├── src/
│   ├── components/        # React компоненты
│   ├── lib/              # Инициализация библиотек (Supabase)
│   ├── utils/            # Утилиты и хелперы
│   ├── types.ts          # TypeScript типы
│   ├── App.tsx           # Главный компонент
│   └── main.tsx          # Точка входа
├── supabase/
│   └── migrations/       # SQL миграции
├── public/               # Статические файлы
└── dist/                 # Сборка (генерируется)
```

## Особенности

- **Реал-тайм синхронизация**: изменения видны на всех устройствах моментально
- **Автосохранение**: данные сохраняются автоматически через 2 секунды после изменения
- **Оффлайн режим**: приложение показывает статус подключения
- **Публичный доступ**: не требует авторизации, все работают с одной базой данных
- **Визуализация**: встроенный просмотр метрик и связей
- **Фильтрация**: по областям, месяцам, незаполненным полям

## Скрипты

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка для продакшена
- `npm run preview` - предпросмотр продакшен сборки
- `npm run lint` - проверка кода ESLint
- `npm run typecheck` - проверка типов TypeScript

## Поддержка браузеров

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Лицензия

MIT
