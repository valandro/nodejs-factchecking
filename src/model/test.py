from transformers import AutoTokenizer  # Or BertTokenizer
from transformers import AutoModelForPreTraining  # Or BertForPreTraining for loading pretraining heads
from transformers import AutoModel  # or BertModel, for BERT without pretraining heads
from transformers import pipeline

model_name = 'neuralmind/bert-base-portuguese-cased'
model = AutoModelForPreTraining.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name, do_lower_case=False)

pipe = pipeline('fill-mask', model=model_name, tokenizer=tokenizer)

results = pipe('Eu moro em uma [MASK] muito grande.')
for i in range(len(results)):
  print(f"the {i}-th result={results[i]['token_str']} has score {results[i]['score']}")