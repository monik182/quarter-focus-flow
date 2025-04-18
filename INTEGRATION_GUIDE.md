
# QuarterFocus Integration Guide

This guide maps integration tasks to specific locations in the codebase.

## 1. Supabase Integration

### Database Schema
Create these tables in your Supabase dashboard:

```sql
-- Example schema for plans table
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  vision TEXT,
  milestone TEXT,
  started BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Additional tables following similar pattern...
```

## 2. Authentication Integration

### Files to Update:
- `src/components/AuthGuard.tsx`: Replace localStorage check with Supabase session
- Create new files:
  * `src/pages/Login.tsx`
  * `src/pages/Signup.tsx`
  * `src/pages/ResetPassword.tsx`
  * `src/context/AuthContext.tsx`

### Route Updates:
Add new routes in `src/App.tsx`:
```tsx
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/reset-password" element={<ResetPassword />} />
```

## 3. Stripe Integration

### Files to Create:
- Supabase Edge Functions:
  * `supabase/functions/create-checkout/index.ts`
  * `supabase/functions/check-subscription/index.ts`
  * `supabase/functions/customer-portal/index.ts`

### Files to Update:
- `src/context/SubscriptionContext.tsx`: Replace mock data with actual Stripe integration
- `src/components/SubscriptionGuard.tsx`: Update to use real subscription data

## 4. Data Management

### Files to Create:
- `src/lib/api/plans.ts`: Plan management functions
- `src/lib/api/goals.ts`: Goal management functions
- `src/lib/api/strategies.ts`: Strategy management functions
- `src/lib/api/indicators.ts`: Indicator management functions

### Components to Update:
- `src/components/PlanOverview.tsx`: Connect to real data
- `src/components/WeeklyProgress.tsx`: Implement CRUD operations
- `src/components/IndicatorTrends.tsx`: Connect to real data

## 5. Progress Tracking

### Files to Update:
- `src/components/WeeklyProgress.tsx`: Add completion functionality
- `src/components/IndicatorTrends.tsx`: Implement real charts

### Files to Create:
- `src/lib/api/progress.ts`: Progress tracking functions
- `src/components/ProgressChart.tsx`: Visualization component

## 6. Templates System

### Files to Create:
- `src/lib/api/templates.ts`: Template management
- `src/components/admin/TemplateManager.tsx`: Admin interface
- `src/data/initial-templates.ts`: Seed data

### Files to Update:
- `src/components/TemplateGallery.tsx`: Connect to real data

## 7. AI Suggestions

### Files to Create:
- `supabase/functions/generate-suggestions/index.ts`: OpenAI integration
- `src/lib/api/suggestions.ts`: Frontend API wrapper
- `src/components/AISuggestions.tsx`: Update with real AI integration

## 8. Final Configuration

### Files to Update:
- `src/lib/supabase.ts`: Configure Supabase client
- `src/lib/stripe.ts`: Configure Stripe client
- Create monitoring and logging setup

## Important Notes:
1. Start with Supabase integration and authentication
2. Test each integration step thoroughly
3. Use TypeScript types throughout
4. Follow existing component patterns
5. Keep components small and focused
6. Implement proper error handling
7. Use proper security measures (RLS, auth checks)
