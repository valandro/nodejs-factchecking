from datasets import load_dataset

emotion_dataset = load_dataset('emotion')
print(emotion_dataset["train"][0])
