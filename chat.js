
converter = new showdown.Converter()
let currentSender = 'TrynTryn'
function customDateFormat(createdAt) {
  const today = dayjs();
  const createdAtDate = dayjs(createdAt);

  if (createdAtDate.isSame(today, 'day')) {
    // Date is today
    return createdAtDate.format('HH:mm');
  } else if (createdAtDate.isSame(today, 'week')) {
    // Date is in this week
    return createdAtDate.format('dddd HH:mm');
  } else if (createdAtDate.isSame(today, 'year')) {
    // Date is in this year
    return createdAtDate.format('DD MMM [at] HH:mm');
  } else {
    // Date is not in this year
    return createdAtDate.format('DD MMM YYYY [at] HH:mm');
  }
}
let loading = false
$("#augustine").on('click',async function(){ 


  if(currentSender !== "Augustine" && loading === false){
    loading = true
    currentSender="Augustine"
    await renderChat()
  }

  loading=false
 });

 $("#tryntryn").click(async function(){ 

  if(currentSender !== "TrynTryn" && loading === false){
    loading = true
    currentSender="TrynTryn"
    await renderChat()
  }
  loading=false

 });

const renderChat = async () => {
  const response = await axios.get('https://memory.augustinenguyen.com/api/chats?sort=createdAt:asc')
  const chatHistory = response.data.data
  const chatHistoryMap = chatHistory.map(chat => {
    console.log(chat);
    if(currentSender === 'TrynTryn'){
      if (chat.attributes.sender === 'TrynTryn') {
        return `<li class="clearfix">
          <div class="message-data align-right">
              <span class="message-data-time">${customDateFormat(chat.attributes.createdAt)}</span> &nbsp; &nbsp;
              <span class="message-data-name">${chat.attributes.sender}</span> <i class="fa fa-circle me"></i>
  
          </div>
          <div class="message other-message float-right">
              ${converter.makeHtml(chat.attributes.content)}
          </div>
      </li>`
  
  
  
      } else {
        return `<li>
          <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i>${chat.attributes.sender}</span>
              <span class="message-data-time">${customDateFormat(chat.attributes.createdAt)}</span>
          </div>
          <div class="message my-message">
          ${converter.makeHtml(chat.attributes.content)}
          </div>
      </li>`
      }
    }
    if (chat.attributes.sender === 'Augustine') {
      return `<li class="clearfix">
        <div class="message-data align-right">
            <span class="message-data-time">${customDateFormat(chat.attributes.createdAt)}</span> &nbsp; &nbsp;
            <span class="message-data-name">${chat.attributes.sender}</span> <i class="fa fa-circle me"></i>

        </div>
        <div class="message other-message float-right">
            ${converter.makeHtml(chat.attributes.content)}
        </div>
    </li>`



    } else {
      return `<li>
        <div class="message-data">
            <span class="message-data-name"><i class="fa fa-circle online"></i>${chat.attributes.sender}</span>
            <span class="message-data-time">${customDateFormat(chat.attributes.createdAt)}</span>
        </div>
        <div class="message my-message">
        ${converter.makeHtml(chat.attributes.content)}
        </div>
    </li>`
    }
    

  })
  const element = document.getElementById('chat-list-history')
  element.innerHTML = `${chatHistoryMap.join('')}`
}
(async function () {
  await renderChat()
  var chat = {
    messageToSend: '',
    messageResponses: [
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',
      'Người yêu của em nè, anh tuyệt vời thật đấy!! 😚 Những điều này em đã ấp ủ từ lâu để thổ lộ với hi vọng anh sẽ hiểu tình cảm của em dành cho anh nhìu thế nào',

    ],
    init: function () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function () {
      this.$chatHistory = $('.chat-history');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList = this.$chatHistory.find('ul');
    },
    bindEvents: function () {
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
    },
    render: async function () {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== '') {
        var template = Handlebars.compile($("#message-template").html());
        var context = {
          messageOutput: this.messageToSend,
          time: this.getCurrentTime()
        };


        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val('');
        const data =
          await axios.post('https://memory.augustinenguyen.com/api/chats', {
            data: {
              sender: currentSender,
              content: context.messageOutput
            }

          })

        // responses
        // var templateResponse = Handlebars.compile( $("#message-response-template").html());
        // var contextResponse = { 
        //   response: this.getRandomItem(this.messageResponses),
        //   time: this.getCurrentTime()
        // };

        // setTimeout(function () {
        //   this.$chatHistoryList.append(templateResponse(contextResponse));
        //   this.scrollToBottom();
        // }.bind(this), 1500);

      }

    },

    addMessage: function () {
      this.messageToSend = this.$textarea.val()
      this.render();
    },
    addMessageEnter: function (event) {
      // enter was pressed
      if (event.keyCode === 13) {
        this.addMessage();
      }
    },
    scrollToBottom: function () {
      this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function () {
      return new Date().toLocaleTimeString().
        replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

  };

  chat.init();

  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function () {
      var userList = new List('people-list', this.options);
      var noItems = $('<li id="no-items-found">No items found</li>');

      userList.on('updated', function (list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };

  searchFilter.init();

})();