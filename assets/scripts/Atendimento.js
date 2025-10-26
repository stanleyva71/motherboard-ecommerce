$(document).ready(function() {
            $('.list-group-item').on('click', function(event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800, function(){
                        window.location.hash = hash;
                    });
                }
            });
        });

        function toggleChat() {
            const chatBox = document.getElementById('chat-box');
            document.body.classList.toggle('show-chatbot');
        }

        function sendMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (message) {
                const chatMessages = document.getElementById('chat-messages');
                const newMessage = document.createElement('li');
                newMessage.classList.add('chat', 'outgoing');
                newMessage.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(newMessage);
                input.value = '';

                // Simulação de resposta do bot
                setTimeout(() => {
                    const botMessage = document.createElement('li');
                    botMessage.classList.add('chat', 'incoming');
                    botMessage.innerHTML = `<span class="material-symbols-outlined"><i class="bi bi-robot fs-1"></i></span><p>Obrigado pela sua mensagem! Estamos aqui para ajudar.</p>`;
                    chatMessages.appendChild(botMessage);
                }, 1000);
            }
        }