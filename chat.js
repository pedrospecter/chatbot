export class Chat {
    constructor({position ="bottom-right"} = {}){
        this.position = this.getPosition(position);
        this.open = false;
        this.initialise();
        this.createStyles();
    }

    getPosition(position){
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px'
        };
    }

    initialise(){
        const container = document.createElement('div');
        container.style.position = 'fixed';
        Object.keys(this.position)
            .forEach(key => container.style[key] = this.position[key]);
        document.body.appendChild(container);  

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const chatIcon = document.createElement('img');
        chatIcon.src="https://www.nortb.com/icons_chatbot/chattBubbleWhite.svg";
        chatIcon.classList.add('icon');
        this.chatIcon = chatIcon;

        const closeIcon = document.createElement('img');
        closeIcon.src ="https://www.nortb.com/icons_chatbot/OpenWhite.svg";
        closeIcon.classList.add('icon', 'hidden');
        this.closeIcon = closeIcon;

        const sendIcon = document.createElement('img');
        sendIcon.src ="https://image.flaticon.com/icons/png/512/2089/2089310.png";
        sendIcon.classList.add('icon2');
        this.sendIcon = sendIcon;

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('hidden','message-container');

        //crete ll the of the content mesasage container
        this.createMessageContainerContent();

        buttonContainer.appendChild(this.chatIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener('click', this.toggleOpen.bind(this)) 



        container.appendChild(this.messageContainer);
        container.appendChild(buttonContainer);
    }

    createStyles(){
        const styleTag = document.createElement('style');
        document.head.appendChild(styleTag);

        styleTag.innerHTML = `
            .icon{
                cursor: pointer;
                width: 50%;
                position: absolute;
                left: 50%;
                margin-left: -12.5px;
                top: 50%;
                margin-top: -12.5px;        
                transition: transform .3s ease;
            }

            .hidden{
                transform: scale(0);
            }

            .button-container {
                background-color: #000;
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .message-container{
                box-shadow: 0 0 18px 8px rgba(0,0,0,0.1);
                width: 300px;
                right: -25px;
                bottom: 75px;
                max-height: 500px;
                position: absolute;
                transition:  max-height .2s ease;
                font-family: Helvetica, Arial, sans-serif; 
            }

            .message-container.hidden {
                max-height: 0px;
            }

            .message-container h2{
                margin: 0;
                font-size: 14px;
                padding: 20px 20px 0px 20px;
                color: #fff;
                background-color: #0f0f0f;
            }
            .message-container p{
                margin: 0;
                font-size: 12px;
                font-weight: 300;
                padding: 0px 20px 20px;
                color: #ddd;
                background-color: #0f0f0f;
            }
            .message-container div{
                height: 300px;
            }

            .sendMenu{
                display: flex;
                height: 50px
            }

            .message-container form * {
                margin: 15px 0;
                padding: 15px;
            }
          
            .message-container form input {
                padding: 10px;
                width: 80%;
                border: none;
                border-bottom: 2px solid #ddd; 
            }
            .icon2 {
                width: 10px;
            }

            
        `
    }

    createMessageContainerContent(){
        this.messageContainer.innerHTML="";
        const title = document.createElement('h2');
        const subtitle = document.createElement('p')
        title.textContent="Hi! How can we help?";
        subtitle.textContent="We are not here yet!"

        const messageViwer = document.createElement('div')


        const form = document.createElement('form');
        form.classList.add('content');
        const sendMenu = document.createElement('div');
        sendMenu.classList.add('sendMenu')
        const email = document.createElement('input');
        email.required = true;
        email.id = 'email',
        email.type = 'text';
        email.placeholder = 'message';

        form.appendChild(sendMenu);

        sendMenu.appendChild(email);
        sendMenu.appendChild(this.sendIcon)
        
        this.sendIcon.addEventListener('submit', this.submit.bind(this));

        this.messageContainer.appendChild(title);
        this.messageContainer.appendChild(subtitle);
        this.messageContainer.appendChild(messageViwer)
        this.messageContainer.appendChild(form)
    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
        } else {
            this.createMessageContainerContent();
            this.chatIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            this.messageContainer.classList.add('hidden');
        }
    }

    submit(event){
        event.preventDefault();
    }
}