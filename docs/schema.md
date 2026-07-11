# Schema Definition Guide

## What is a Schema?

A schema is a **data structure definition** that describes:
- What fields an object should have
- What type each field should be
- Whether a field is required
- Any validation rules or defaults

Schemas are useful for:
- Validating form input
- Documenting API payloads
- Building payloads from form data
- Ensuring consistency across your app

---

## Constants vs Config vs Schemas

### Constants (`/constants`)
Static values that don't change. Examples:
```javascript
// constants/api.js
export const API_TIMEOUT = 5000;
export const MAX_RETRIES = 3;
export const HTTP_STATUS = { OK: 200, ERROR: 500 };
```

### Config (`/config`)
Environment/app settings that might change based on environment:
```javascript
// config/database.js
export const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
```

### Schemas (`/schemas`)
Data structure definitions that describe object shapes:
```javascript
// schemas/flashcard.js
export const FLASHCARD_SCHEMA = {
  question: { type: 'string', required: true },
  answer: { type: 'string', required: true }
};
```

**Key Difference:**
- Constants = values
- Config = settings
- Schemas = structure definitions

---

## Schema Definition Approaches

### Approach 1: Simple Field List
Best for: Quick, minimal schemas without validation

```javascript
const FLASHCARD_SCHEMA = ['question', 'answer'];

const buildPayload = (formData, schema) => {
  return {
    values: Object.fromEntries(
      schema.map(field => [field, formData.get(field)])
    )
  };
};

// Usage
const payload = buildPayload(formData, FLASHCARD_SCHEMA);
// Output: { values: { question: '...', answer: '...' } }
```

### Approach 2: Detailed Schema with Types
Best for: Documentation and basic type hints

```javascript
const FLASHCARD_SCHEMA = {
  question: { type: 'string', required: true },
  answer: { type: 'string', required: true },
  difficulty: { type: 'string', required: false, default: 'medium' }
};

const buildPayload = (formData, schema) => {
  const values = {};
  for (const [key, config] of Object.entries(schema)) {
    values[key] = formData.get(key) || config.default || null;
  }
  return { values };
};

// Usage
const payload = buildPayload(formData, FLASHCARD_SCHEMA);
```

### Approach 3: Schema with Validation
Best for: Production apps with strict validation requirements

```javascript
const FLASHCARD_SCHEMA = {
  question: { 
    type: 'string', 
    required: true, 
    minLength: 5,
    maxLength: 500
  },
  answer: { 
    type: 'string', 
    required: true, 
    minLength: 10,
    maxLength: 2000
  }
};

const validate = (formData, schema) => {
  const errors = {};
  
  for (const [key, config] of Object.entries(schema)) {
    const value = formData.get(key)?.trim() || '';
    
    // Check required
    if (config.required && !value) {
      errors[key] = `${key} is required`;
      continue;
    }
    
    // Check minLength
    if (value && config.minLength && value.length < config.minLength) {
      errors[key] = `${key} must be at least ${config.minLength} characters`;
    }
    
    // Check maxLength
    if (value && config.maxLength && value.length > config.maxLength) {
      errors[key] = `${key} must be less than ${config.maxLength} characters`;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Usage
const validation = validate(formData, FLASHCARD_SCHEMA);
if (!validation.valid) {
  console.error(validation.errors);
  // Display errors to user
}
```

---

## Folder Structure

### Option 1: Dedicated `/schemas` folder
Best for: Projects with many schemas
```
src/app/
├── js/
│   ├── schemas/
│   │   ├── flashcard.js
│   │   ├── note.js
│   │   └── user.js
│   ├── api/
│   ├── utils/
│   └── index.js
```

### Option 2: In `/constants` folder
Best for: Projects with few schemas
```
src/app/
├── js/
│   ├── constants/
│   │   ├── api.js
│   │   └── schemas.js    ← Put all schemas here
│   ├── api/
│   └── index.js
```

### Option 3: Co-located with features
Best for: Feature-based organization
```
src/app/
├── js/
│   ├── features/
│   │   ├── flashcards/
│   │   │   ├── schema.js
│   │   │   ├── api.js
│   │   │   └── index.js
```

---

## Using Schemas in Your App

### Step 1: Define the schema
```javascript
// schemas/flashcard.js
export const FLASHCARD_SCHEMA = {
  question: { type: 'string', required: true },
  answer: { type: 'string', required: true }
};
```

### Step 2: Import and use in your form handler
```javascript
// index.js
import { FLASHCARD_SCHEMA } from './schemas/flashcard.js';
import { postRows } from './api/postRow.js';

const flashCardEditor = document.querySelector('#flashcardEditor');

flashCardEditor.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(flashCardEditor);
  
  // Build payload using schema
  const payload = {
    values: Object.fromEntries(
      Object.keys(FLASHCARD_SCHEMA).map(field => 
        [field, formData.get(field)]
      )
    )
  };
  
  postRows(payload);
});
```

---

## Best Practices

1. **Keep schemas close to where they're used**
   - If only used in one feature, keep it local
   - If used across features, move to `/schemas`

2. **Export schemas as constants**
   ```javascript
   export const FLASHCARD_SCHEMA = { ... };
   ```

3. **Use descriptive field names**
   ```javascript
   // Good
   { question: { ... } }
   
   // Not as clear
   { q: { ... } }
   ```

4. **Document complex validation rules**
   ```javascript
   {
     question: {
       type: 'string',
       required: true,
       minLength: 5, // User feedback: questions must be at least 5 chars
       maxLength: 500
     }
   }
   ```

5. **Create helper functions for common operations**
   ```javascript
   // utils/schemaHelpers.js
   export const buildPayload = (formData, schema) => {
     return {
       values: Object.fromEntries(
         Object.keys(schema).map(field => [field, formData.get(field)])
       )
     };
   };
   ```

---

## Your Current Code

Current approach (no schema):
```javascript
const payload = {
  values: {
    question: formData.get('question'),
    answer: formData.get('answer')
  }
};
```

**Task for you:** Refactor this to use a schema definition following one of the approaches above. Choose which approach you prefer and implement it!
