import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Example data
data = [
    {"amount": 100.0, "date": "2023-01-01", "name": "Grocery Store", "category": "Groceries"},
    {"amount": 50.0, "date": "2023-01-02", "name": "Gas Station", "category": "Fuel"},
    {"amount": 300.0, "date": "2023-01-03", "name": "Electronics Store", "category": "Electronics"},
    {"amount": 20.0, "date": "2023-01-04", "name": "Coffee Shop", "category": "Food"},
    # Add more labeled transactions
]

# Convert to DataFrame
df = pd.DataFrame(data)

# Feature engineering: combine amount and name into a single feature
df['feature'] = df['name'] + " " + df['amount'].astype(str)

# Extract features and labels
X = df['feature']
y = df['category']

# Convert text data to TF-IDF features
vectorizer = TfidfVectorizer()
X_tfidf = vectorizer.fit_transform(X)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)

# Initialize and train the classifier
classifier = RandomForestClassifier()
classifier.fit(X_train, y_train)

# Predict on the test set
y_pred = classifier.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy * 100:.2f}%")

# Example of predicting a new transaction
new_transaction = {"amount": 75.0, "date": "2023-01-05", "name": "Supermarket"}
new_feature = f"{new_transaction['name']} {new_transaction['amount']}"
new_feature_tfidf = vectorizer.transform([new_feature])
predicted_category = classifier.predict(new_feature_tfidf)
print(f"Predicted category for the new transaction: {predicted_category[0]}")
