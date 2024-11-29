## Optimal Lossless Compression

Requirements:

- A single symbol must be mapped to a unique binary code
- No data should be lost when coding (lossless compression)
- Unique decodability: given an encoding scheme the decoder must unambiguously decode the original message

Optimal lossless compression ends up being a balancing act: we need to be careful to not use a lot of unnecessary bits, but if we use very few bits we end up losing information from the original message. **There must be a limit on the amount of compression possible that still retains the original message.** This is the exact question Claude Shannon asked.

In a sense, asking about how much can we compress a message fundamentally is also asking about how much information is contained in that message. **But how do we measure information?**

Shannon realized that

1. Information and probability are inversely related
   1. High probability events → low information content
   2. Low probability events → High information content
2. Any metric of information should be non negative.
   1. An event should never cause to lose information.
3. An event that occurs with 100% certainty yields no information
4. If 2 independent events are observed separately the total information from these observations should equals the sums of the information of each of the events individually.

## Entropy

Consider 2 machines outputting letters ABCD with different probabilities:

- Machine 1:
  - A, B, C, D: 25% each
- Machine 2:
  - A: 50%, D: 25%, B/C: 12.5% each

**Which machine produces more information?**

Shannon approached this by asking: How many yes/no questions are needed to predict the next symbol?

For Machine 1, we need 2 questions every time. For Machine 2, we need:

- 1 question 50% of the time (A)
- 2 questions 25% of the time (D)
- 3 questions 25% of the time (B/C)

This averages to **1.75 questions** per symbol. With 100 symbols, Machine 1 needs 200 questions while Machine 2 needs 175. Therefore, **Machine 2 produces less information** due to higher predictability.

Shannon called this measure of uncertainty **entropy (H)**, measured in **bits**.

In a more general way, entropy can be computed as the summation for each symbol of the probability of that symbol times the logarithm base 2 of 1 over that probability.

For our machine 2, it equals to `0.5 + 0.5 + 0.375 + 0.375` or `1.75`

By measuring how much information is in a message, Shannon also answered what’s the compression limit of that message without losing information.

To summarize:

- Entropy is the maximum when all outcomes are equally likely
- Anytime you move away from it, or introduce predictability, entropy must go down
- If entropy of an information source drops, that means we can ask fewer question to know the outcome
- The more unpredictable a distribution is, the higher the entropy is

## Why Call this Metric Entropy?

Claude Shannon said:

> My greatest concern was what to call it. I thought of calling it ‘information’, but the word was overly used, so I decided to call it ‘uncertainty’. When I discussed it with John Von Neumann, he had a better idea

Von Neumann said:

> (…) No one knows what entropy really is, so in a debate you will always have the advantage

## Shannon-Fano Coding

Compression algorithm that approximates the idea of splitting symbols into equally likely groups until every symbol has unique encoding.

First it computes the probability for each symbol and sorts them in increasing order

![fano-1](/images/huffman-coding/fano-1.webp)

Then we find the find the best split of probabilities between the two groups such that the sum of each individual group is as close to each other as possible. Then this process is repeated recursively on each sub-group until every group has one symbol.

![fano-2](/images/huffman-coding/fano-2.webp)

The encoding is simply: every time we go to the left group we add a 0, and to the right a 1.

One good aspect of how these trees are constructed is that the average length per symbol is the sum of the probabilities of each node except the root.

![fano-3](/images/huffman-coding/fano-3.webp)

For a couple of years this was the best scheme people had to perform loseless compression, and produced optimal for a variety of distributions, but not always

## Huffman Coding

> Entropy is the limit of compression

What's the optimal coding strategy in bits when we know symbol probabilities in a message?

The key idea is that we gave more likely symbols a smaller encoding.

Huffman's 1952 solution builds a binary tree from bottom up, starting with all symbols as nodes. The process merges the two least probable nodes, adding their probabilities.

![huffman-1](/images/huffman-coding/huffman-1.webp)

We merge the least likely nodes repeatedly until reaching a single root node. Next step will look like this:

![huffman-2](/images/huffman-coding/huffman-2.webp)

At the end we reach the optimal tree

![huffman-3](/images/huffman-coding/huffman-3.webp)

Encoding works in the same way as Shannon-Fano enconding.

This optimal **Huffman encoding** achieves maximum compression.

For Machine 2, we calculate average bits per letter:

```js
1*0.5 + 3*0.125 + 3*0.125 + 2*0.25 = 1.75
```

For the example above, as we said, we can just sum the nodes probabilities except the root, which will give us `2.3` which is close to the entropy of `2.23` for that distribution.

Shannon proved that entropy sets the compression limit. Lower entropy (more predictable patterns) enables better compression, but compressing beyond entropy requires losing information.

Notice that while Shannon-Fano follows a top-down approach, Huffman Coding uses a bottom-up approach.
