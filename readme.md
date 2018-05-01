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
};

glanceJSON(data, "John > phoneNumber") // 555-555-555
```

# Options

### key
Perform an exact match search on keys

```javascript
let data = {
	square: {
		backgroundColor: "blue",
		color: "red"
	}
};

glanceJSON(data, "color#key"); // red
```

### value
Perform an exact match search on values

```javascript
let data = {
	contacts: [{
		firstName: "John",
		lastName: "Doe",
		phoneNumber: 555-555-555
	},
    {
    	firstName: "Johnny",
       	lastName: "Doey",
       	phoneNumber: 555-555-555	
    }]
};

glanceJSON(data, "John#value > phoneNumber") // 555-555-555
```

### key-contains
Perform a contains text search on keys

```javascript
let data = {
	contact: {
		firstName: "John",
		lastName: "Doe",
		phoneNumber: 555-555-555
	}
};

glanceJSON(data, "first#key-contains > phoneNumber") // 555-555-555
```

### value-contains
Perform a contains text search on values

```javascript
let data = {
	contact: {
		firstName: "John",
		lastName: "Doe",
		phoneNumber: 555-555-555
	}
};

glanceJSON(data, "555#value-contains > firstName") // John
```

### exact text
Perform a match search on key's exact text

```javascript
let data = {
	contact: {
		Name: "John Doe",
		firstName: "John",
		lastName: "Doe",
		phoneNumber: 555-555-555
	}
};

glanceJSON(data, "Name #exact-text"); // John Doe
