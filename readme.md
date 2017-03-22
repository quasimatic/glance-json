# Glance JSON

```bash
npm install glance-json
```

# Example

```javascript
import glanceJSON from 'glance-json';

let data = {
	contact: {
		firstName: "John",
		lastName: "Doe",
		phoneNumber: 555-555-555
	}
}

glanceJSON(data, "John > phoneNumber") // Returns 555-555-555
```