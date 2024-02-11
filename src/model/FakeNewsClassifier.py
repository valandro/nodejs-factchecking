from transformers import AutoModelForPreTraining  # Or BertForPreTraining for loading pretraining heads

class FakeNewsClassifier(nn.Module):
    def __init__(self, classes):
        super(FakeNewsClassifier, self).__init__()
        self.bert = AutoModelForPreTraining.from_pretrained('neuralmind/bert-large-portuguese-cased')
        self.drop = nn.Dropout(p=0.3)
        self.out = nn.Linear(self.bert.config.hidden_size, classes)
        self.softmax = nn.Softmax(dim=1)
    
    def forward(self, input_ids, mask):
        _, pooled_output = self.bert(
            input_ids=input_ids,
            mask=mask
        )
        output = self.drop(pooled_output)
        output = self.out(output)