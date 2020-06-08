// Script for embedding image links sent in the chat
// https://github.com/06000208/CyTube-Cubed

const chat = document.getElementById("messagebuffer");
const fileTypes = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const initialMessages = Array.from(chat.children);

const embed = function(message) {
  const content = message.textContent.toLowerCase();
  if (content.startsWith("http") && fileTypes.includes(content.substring(content.lastIndexOf(".")))) {
    message.innerHTML = `<img class="channel-emote" src="${message.textContent}" title="${message.textContent}">`;
  }
};

initialMessages.forEach((container) => {
  embed(container.lastChild);
});

const onNewMessage = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      embed(mutation.addedNodes[0].lastChild);
    }
  }
};
const observer = new MutationObserver(onNewMessage);
observer.observe(chat, { attributes: false, childList: true, subtree: true });
