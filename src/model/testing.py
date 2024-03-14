from transformers import BertTokenizer  # Or BertForPreTraining for loading pretraining heads
import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rc
import seaborn as sns
from sklearn.model_selection import train_test_split

if __name__ == '__main__':
    df = pd.read_json('../../final_dataset.json')
    tokenizer = BertTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased')
    token_lens = []
    MAX_LEN = 190
    RANDOM_SEED = 42
    np.random.seed(RANDOM_SEED)
    torch.manual_seed(RANDOM_SEED)

    df_train, df_test = train_test_split(df, test_size=0.1, random_state=RANDOM_SEED)
    df_val, df_test = train_test_split(df_test, test_size=0.5, random_state=RANDOM_SEED)

    # for txt in df.content:
    #     tokens = tokenizer.encode(txt, max_length=512)
    #     token_lens.append(len(tokens))

    # sns.distplot(token_lens)
    # plt.xlim([0, 256]);
    # plt.xlabel('Token count');
    # plt.show()


    # class_names = [0,3,5]
    # model = BertTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased')
    # sample_txt = 'When was I last outside? I am stuck at home for 2 weeks.'
    # tokens = model.tokenize(sample_txt)
    # token_ids = model.convert_tokens_to_ids(tokens)
    # encoding = model.encode_plus(
    #     sample_txt,
    #     max_length=32,
    #     add_special_tokens=True, # Add '[CLS]' and '[SEP]'
    #     return_token_type_ids=False,
    #     pad_to_max_length=True,
    #     return_attention_mask=True,
    #     return_tensors='pt',  # Return PyTorch tensors
    # )
    # print(f' Sentence: {sample_txt}')
    # print(f'   Tokens: {tokens}')
    # print(f'Token IDs: {token_ids}')
    # print(model.convert_ids_to_tokens(encoding['input_ids'][0]))