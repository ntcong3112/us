
converter = new showdown.Converter()
var currentSender = 'TrynTryn'
let augustineName = ''
let trynName = ''


  
const getProfile = async () => {
  const response = await axios.get('https://memory.augustinenguyen.com/api/chat-chit?populate=*')
  const data = response.data.data
  document.getElementById('avatar-augustine').innerHTML = `<img class="avatar-image" src="${data.attributes.Avatar_Cua_Anh.data.attributes.formats.small.url}"
  alt="avatar" />`
  document.getElementById('avatarSender').innerHTML = `<img class="avatar-image" src="${data.attributes.Avatar_Chat.data.attributes.formats.small.url}"
  alt="avatar" />`
  document.getElementById('avatar-tryn').innerHTML = `<img class="avatar-image" src="${data.attributes.Avatar_Cua_Em.data.attributes.formats.small.url}"
  alt="avatar" />`
  document.getElementById('name-augustine').innerText = data.attributes.Ten_Anh
  augustineName = data.attributes.Ten_Anh
  trynName = data.attributes.Ten_Em
  document.getElementById('name-tryn').innerText = data.attributes.Ten_Em
  document.getElementById('chat-with').innerText = data.attributes.Ten_Chat

}
getProfile()
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
$("#open-emoji-box").on('click', async function () {
  let div = $("#emoji-box");
  if (div.css("display") === "block") {
    div.hide();
  } else {
    div.show();
  }

});

$(".chat-history, #message-to-send").on('click', async function () {
  $("#emoji-box").hide()

});

$("#augustine").on('click', async function () {

  if (currentSender !== "Augustine" ) {
    currentSender = "Augustine"

    await renderChat()
    const c =  $('#chat-ht')
    c[0].scrollTop = c[0].scrollHeight
  }
  $("#people-list").hide()

});

$("#tryntryn").click(async function () {

  if (currentSender !== "TrynTryn" ) {
    currentSender = "TrynTryn"

    await renderChat()
    const c =  $('#chat-ht')
    c[0].scrollTop = c[0].scrollHeight
  }
  $("#people-list").hide()


});
$(".chat-header").click(async function () {
  let div = $("#people-list");
  if (div.css("display") === "block") {
    div.hide();
  } else {
    div.show();
  }
});
$('#send-media-chat').click(function () { $('#imgupload').trigger('click'); });

const loadMoreChat = () => {

}
let isLoadingChat = false;
let dataChat = [];
let currentPageChat = 1
let totalPageChat = 0
$('.chat-history').on('scroll', function () {
  if ($(this).scrollTop() < 200 && currentPageChat <= totalPageChat) {
    // User has scrolled to the top
    renderChat();
  }
});

const renderChat = async () => {
  if (isLoadingChat) return;
  isLoadingChat = true;
  const response = await axios.get(`https://memory.augustinenguyen.com/api/chats?sort=createdAt:desc&pagination[page]=${currentPageChat}&pagination[pageSize]=15`)
  totalPageChat = response.data.meta.pagination.pageCount
  const reverse = response.data.data.reverse()
  dataChat = [...reverse,...dataChat  ]
  const chatHistoryMap = dataChat.map(chat => {
    if (currentSender === 'TrynTryn') {
      if (chat.attributes.sender === 'TrynTryn') {
        return `<li class="clearfix">
          <div class="message-data align-right">
              <span class="message-data-time">${customDateFormat(chat.attributes.createdAt)}</span> &nbsp; &nbsp;
              <span class="message-data-name">${chat.attributes.sender === 'TrynTryn' ? trynName : augustineName}</span> <i class="fa fa-circle online"></i>
  
          </div>
          <div class="message other-message float-right">
              ${converter.makeHtml(chat.attributes.content)}
          </div>
      </li>`



      } else {
        return `<li>
          <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i>${chat.attributes.sender === 'TrynTryn' ? trynName : augustineName}</span>
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
            <span class="message-data-name">${chat.attributes.sender === 'TrynTryn' ? trynName : augustineName}</span> <i class="fa fa-circle online"></i>

        </div>
        <div class="message other-message float-right">
            ${converter.makeHtml(chat.attributes.content)}
        </div>
    </li>`



    } else {
      return `<li>
        <div class="message-data">
            <span class="message-data-name"><i class="fa fa-circle online"></i>${chat.attributes.sender === 'TrynTryn' ? trynName : augustineName}</span>
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
  const mediaElements = document.querySelectorAll(' .chat-history img, .chat-history video');


  mediaElements.forEach(mediaElement => {
    mediaElement.addEventListener('click', function () {
      if (mediaElement.tagName.toLowerCase() === 'video') {

      } else {
        // If it's an image, show full screen
        showFullScreenImage(mediaElement.src);
      }
    });
  });

  fullPage.addEventListener('click', function () {
    closeFullScreen();
  });

  isLoadingChat = false
  currentPageChat++
}
(async function () {
  
  const c =  $('#chat-ht')
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
      const handleOnEmojiSelect= (data) => {
        this.$textarea.val(this.$textarea.val() + data.native)
      }
      const pickerOptions = { onEmojiSelect: handleOnEmojiSelect }
      const picker = new EmojiMart.Picker(pickerOptions)
      $('#emoji-box').append(picker)
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
          time: this.getCurrentTime(),
          currentSender: currentSender === 'TrynTryn' ? trynName : augustineName
        };


        this.$chatHistoryList.append(template(context));
        c[0].scrollTop = c[0].scrollHeight
        this.$textarea.val('');
        const data =
          await axios.post('https://memory.augustinenguyen.com/api/chats', {
            data: {
              sender: currentSender,
              content: context.messageOutput
            }

          })
          dataChat= [...dataChat, data.data.data]
      
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
        document.getElementById("message-to-send").style.height = "32px";
        // $("#message-to-send").css('height', "32px")
        this.addMessage();
      }
    },
    scrollToBottom: function () {
      this.$chatHistory.scrollTop = this.$chatHistory[0].scrollHeight;
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
  const images = [...document.querySelectorAll("#chat-ht img")];
  const proms=images.map(im=>new Promise(res=>
  im.onload=()=>res([im.width,im.height])
  ))
  await Promise.all(proms).then(data=>{
    c[0].scrollTop = c[0].scrollHeight
  })
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