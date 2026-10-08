const models = [
  {rank:1,name:"Claude Fable 5.1",setting:"Max",vendor:"Anthropic",score:14.31,mark:"A",url:"https://claude.ai/",summary:"Anthropic 的 Claude 系列高阶推理档位，适合复杂问题拆解、长文本协作与多步骤 Agent 任务。"},
  {rank:2,name:"Claude Opus 5.5",setting:"High",vendor:"Anthropic",score:13.82,mark:"A",url:"https://claude.ai/",summary:"Claude Opus 系列的高能力版本；高推理档位适合需要仔细分析、写作和复杂任务规划的场景。"},
  {rank:3,name:"Claude Sonnet 5.5",setting:"Max",vendor:"Anthropic",score:12.52,mark:"A",url:"https://claude.ai/",summary:"Claude Sonnet 系列的高推理档位，面向日常对话、内容创作、编程辅助和连续协作。"},
  {rank:4,name:"GPT 6 Astra",setting:"Max",vendor:"OpenAI",score:12.27,mark:"◎",url:"https://chatgpt.com/",summary:"OpenAI 的 GPT 系列高推理模型，适合复杂问答、代码、资料整理与需要多步推理的 Agent 工作。"},
  {rank:5,name:"GPT 6.1 Sol",setting:"Max",vendor:"OpenAI",score:11.23,mark:"◎",url:"https://chatgpt.com/",summary:"GPT 系列的通用模型档位，在对话、分析、写作和工具协作之间提供均衡体验。"},
  {rank:6,name:"GPT 6 Sol",setting:"Max",vendor:"OpenAI",score:9.71,mark:"◎",url:"https://chatgpt.com/",summary:"OpenAI 的 GPT 通用模型，适合问答、内容生成、代码协作和日常工作辅助。"},
  {rank:7,name:"Claude Opus 5",setting:"High",vendor:"Anthropic",score:8.67,mark:"A",url:"https://claude.ai/",summary:"Claude Opus 系列高能力模型的高推理档位，适合深度研究、复杂写作与多步骤任务。"},
  {rank:8,name:"Claude Fable 5",setting:"High",vendor:"Anthropic",score:8.21,mark:"A",url:"https://claude.ai/",summary:"Claude Fable 系列的高推理档位，面向需要更深入分析和规划的使用场景。"},
  {rank:9,name:"Claude Opus 5",setting:"Max",vendor:"Anthropic",score:7.92,mark:"A",url:"https://claude.ai/",summary:"同为 Claude Opus 5，但使用 Max 推理档位；它与 High 是榜单中的独立配置条目。"},
  {rank:10,name:"Gemini 4 Argon",setting:"High",vendor:"Google",score:7.57,mark:"G",url:"https://gemini.google.com/",summary:"Google Gemini 系列的高推理档位，可用于多模态问答、创作、资料理解和 Google 生态协作。"}
];

const list = document.querySelector("#model-list");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty-state");
let activeFilter = "all";

function render() {
  const query = search.value.trim().toLowerCase();
  const filtered = models.filter(model => {
    const matchesVendor = activeFilter === "all" || model.vendor === activeFilter;
    const matchesQuery = `${model.name} ${model.setting} ${model.vendor} ${model.summary}`.toLowerCase().includes(query);
    return matchesVendor && matchesQuery;
  });
  list.innerHTML = filtered.map(model => `
    <article class="model-row" style="animation-delay:${(model.rank-1)*28}ms">
      <div class="rank-num ${model.rank <= 3 ? "top" : ""}">${String(model.rank).padStart(2,"0")}</div>
      <div class="model-info"><span class="vendor-mark ${model.vendor.toLowerCase()}" aria-hidden="true">${model.mark}</span><div><div class="model-name">${model.name}</div><div class="model-sub">${model.vendor} <span>·</span> ${model.setting} 推理档位</div><div class="model-summary">${model.summary}</div></div></div>
      <div class="score-cell"><span class="score-value">${model.score.toFixed(2)}%</span><span class="score-track"><span class="score-fill" style="display:block;width:${(model.score/14.31)*100}%"></span></span></div>
      <a class="official-link" href="${model.url}" target="_blank" rel="noreferrer" aria-label="体验 ${model.name} 的官方产品">官网 <span>↗</span></a>
    </article>`).join("");
  empty.hidden = filtered.length > 0;
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filter.active").classList.remove("active");
  button.classList.add("active");
  activeFilter = button.dataset.filter;
  render();
}));
search.addEventListener("input", render);
render();
