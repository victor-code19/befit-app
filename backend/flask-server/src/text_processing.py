import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords

stop_words = stopwords.words('english')
ps = PorterStemmer()


def process_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    t = []

    for word in text:
        if word.isalnum():
            t.append(word)

    text = t[:]
    t.clear()

    for word in text:
        if word not in stop_words:
            t.append(word)

    text = t[:]
    t.clear()

    for word in text:
        t.append(ps.stem(word))

    return " ".join(t)
