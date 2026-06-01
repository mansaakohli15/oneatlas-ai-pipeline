# Evaluation Summary

## Results

Total prompts tested: 12

Successful generations: 12

Failed generations: 0

Success rate: 100%

Average latency: 949 ms

Latency range: 141 ms – 1773 ms

Average estimated cost per run: $0.001

Total estimated cost across all evaluation runs: $0.012

## Most Common Failure Type

No unrecovered failures occurred during evaluation. The most frequently invoked repair strategy was Structural Repair, which was applied proactively to normalize generated outputs and ensure schema compliance before downstream processing.

## Weakest Stage

No stage consistently failed during evaluation. The Schema Generation and App Spec Generation stages exhibited the highest latency because they perform the most extensive structured output generation and cross-reference validation.

## Next Improvement

The next improvement would be expanding the repair engine's consistency repair capabilities. Currently, deterministic cross-reference fixes are supported, but additional automated correction logic for complex relation graphs and integration workflow mappings would further improve resilience against malformed AI outputs.

## Conclusion

The pipeline successfully processed all standard and edge-case prompts while maintaining schema validity, cross-layer consistency, integration validation, and AppSpec generation requirements. Validation and repair mechanisms prevented malformed outputs from propagating downstream, resulting in a 100% completion rate across the evaluation suite.
