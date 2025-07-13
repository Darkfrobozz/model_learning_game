/**
 * @typedef {Object} NonChatChoice
 * @property {string|null} finish_reason - The reason the generation was completed
 * @property {string} text - The generated text
 * @property {ErrorResponse} [error] - Optional error information
 */

/**
 * @typedef {Object} NonStreamingChoice
 * @property {string|null} finish_reason - The reason the generation was completed
 * @property {string|null} native_finish_reason - The original finish reason from the provider
 * @property {Object} message - The generated message
 * @property {string|null} message.content - The content of the message
 * @property {string} message.role - The role of the message sender
 * @property {ToolCall[]} [message.tool_calls] - Optional tool calls
 * @property {ErrorResponse} [error] - Optional error information
 */

/**
 * @typedef {Object} StreamingChoice
 * @property {string|null} finish_reason - The reason the generation was completed
 * @property {string|null} native_finish_reason - The original finish reason from the provider
 * @property {Object} delta - The delta content of the streaming response
 * @property {string|null} delta.content - The content of the delta
 * @property {string} [delta.role] - The role of the message sender (optional in delta)
 * @property {ToolCall[]} [delta.tool_calls] - Optional tool calls
 * @property {ErrorResponse} [error] - Optional error information
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {number} code - Error code (see "Error Handling" section)
 * @property {string} message - Error message
 * @property {Object.<string, unknown>} [metadata] - Additional error information including provider details, raw error message, etc.
 */

/**
 * @typedef {Object} ResponseUsage
 * @property {number} prompt_tokens - Number of tokens used in the prompt (including images and tools if any)
 * @property {number} completion_tokens - Number of tokens generated in the completion
 * @property {number} total_tokens - Sum of prompt_tokens and completion_tokens
 */

/**
 * @typedef {Object} ResponseLLM
 * @property {string} id - The unique identifier for the completion
 * @property {(NonStreamingChoice)[]} choices - Array of completion choices (shape varies based on streaming and input type)
 * @property {number} created - Unix timestamp of when the completion was created
 * @property {string} model - The model used for completion
 * @property {'chat.completion'|'chat.completion.chunk'} object - Type of the response object
 * @property {string} [system_fingerprint] - System fingerprint (only present if supported by provider)
 * @property {ResponseUsage} [usage] - Token usage information (always present for non-streaming, sent once at end for streaming)
 *
 * @description The response shape varies depending on:
 * - Whether "stream" was set to "true"
 * - Whether the input was "messages" or a "prompt"
 * Usage data is always returned for non-streaming responses.
 * When streaming, you get one usage object at the end with an empty choices array.
 */

/**
 * @typedef {Object} RequestLLM
 * @property {Message[]} [messages] - Either "messages" or "prompt" is required (chat format)
 * @property {string} [prompt] - Either "messages" or "prompt" is required (completion format)
 * @property {string} [model] - Model to use (defaults to user's default). See "Supported Models" section.
 * @property {Object} [response_format] - Forces specific output format
 * @property {'json_object'} response_format.type - JSON output mode
 * @property {string|string[]} [stop] - Stop sequences
 * @property {boolean} [stream] - Enable streaming
 * @property {number} [max_tokens] - Maximum tokens to generate (Range: [1, context_length))
 * @property {number} [temperature] - Sampling temperature (Range: [0, 2])
 * @property {Tool[]} [tools] - Tools/functions available to the model
 * @property {ToolChoice} [tool_choice] - Tool selection preference
 * @property {number} [seed] - Random seed (integer only)
 * @property {number} [top_p] - Nucleus sampling (Range: (0, 1])
 * @property {number} [top_k] - Top-k sampling (Range: [1, ∞), not for OpenAI)
 * @property {number} [frequency_penalty] - Frequency penalty (Range: [-2, 2])
 * @property {number} [presence_penalty] - Presence penalty (Range: [-2, 2])
 * @property {number} [repetition_penalty] - Repetition penalty (Range: (0, 2])
 * @property {Object<number, number>} [logit_bias] - Logit bias map
 * @property {number} [top_logprobs] - Return top logprobs (integer only)
 * @property {number} [min_p] - Minimum probability (Range: [0, 1])
 * @property {number} [top_a] - Top-a sampling (Range: [0, 1])
 * @property {Object} [prediction] - Latency optimization with predicted output
 * @property {'content'} prediction.type - Prediction type
 * @property {string} prediction.content - Predicted content
 * @property {string[]} [transforms] - OpenRouter prompt transforms
 * @property {string[]} [models] - OpenRouter model routing options
 * @property {'fallback'} [route] - OpenRouter fallback routing
 * @property {ProviderPreferences} [provider] - OpenRouter provider preferences
 * @property {string} [user] - Stable identifier for end-users (abuse prevention)
 */

/**
 * @typedef {Object} TextContent
 * @property {'text'} type - Content type
 * @property {string} text - Text content
 */

/**
 * @typedef {Object} ImageContentPart
 * @property {'image_url'} type - Content type
 * @property {Object} image_url - Image details
 * @property {string} image_url.url - URL or base64 encoded image data
 * @property {string} [image_url.detail] - Image detail level (default: "auto")
 */

/**
 * @typedef {TextContent|ImageContentPart} ContentPart
 */

/**
 * @typedef {Object} UserAssistantSystemMessage
 * @property {'user'|'assistant'|'system'} role - Message role
 * @property {string|ContentPart[]} content - Message content (ContentParts only for 'user')
 * @property {string} [name] - If included, prepended as `{name}: {content}` for non-OpenAI models
 */

/**
 * @typedef {Object} ToolMessage
 * @property {'tool'} role - Message role
 * @property {string} content - Tool output
 * @property {string} tool_call_id - ID of the tool call
 * @property {string} [name] - Tool name
 */

/**
 * @typedef {UserAssistantSystemMessage|ToolMessage} Message
 */

/**
 * @typedef {Object} FunctionDescription
 * @property {string} [description] - Function description
 * @property {string} name - Function name
 * @property {Object} parameters - JSON Schema parameters
 */

/**
 * @typedef {Object} Tool
 * @property {'function'} type - Tool type
 * @property {FunctionDescription} function - Function details
 */

/**
 * @typedef {'none'|'auto'|FunctionToolChoice} ToolChoice
 */

/**
 * @typedef {Object} FunctionToolChoice
 * @property {'function'} type - Tool type
 * @property {Object} function - Function selection
 * @property {string} function.name - Name of function to call
 */

/**
 * @typedef {Object} ProviderPreferences
 * @description OpenRouter provider routing preferences (documentation at: openrouter.ai/docs/provider-routing)
 */
