var audio = document.getElementById("abcdef");
audio.volume = 0.3;
converter = new showdown.Converter()
async function textAreaAdjust(element) {
    if (Number(element.style.height.replace('px', '')) <= 200) {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight > 200 ? 200 : element.scrollHeight) + "px";
    }

}
const fullPage = document.querySelector('#fullpage');
const body = document.body;
function showFullDetail(index) {
    const detailElement = document.querySelector(`#time_line_item_list .time_line-item:nth-child(${index + 1}) .time_line-descr`);
    const memory = data[index];

    // Replace truncated detail with full detail text
    detailElement.innerHTML = `${converter.makeHtml(memory.attributes.Detail)} <br/> <br/> <span class="see-less" onclick="showLessDetail(${index})">Rút ngắn iu thưn :<</span>`;
}

// Function to show truncated detail text when "See Less" is clicked
function showLessDetail(index) {
    const detailElement = document.querySelector(`#time_line_item_list .time_line-item:nth-child(${index + 1}) .time_line-descr`);
    const memory = data[index];

    // Truncate detail text if it's too long
    const html = converter.makeHtml(memory.attributes.Detail);
    const truncatedDetail = html.length > 200
    ? html.substring(0, 200) + '...'
    : html;
    

    // Replace full detail with truncated detail and "See More" button
    detailElement.innerHTML = `${truncatedDetail} <br/> <br/> <span class="see-more" onclick="showFullDetail(${index})">Ấn để xem thêm nhìu iu thưn :></span>`;
}
function showFullScreenVideo(source) {
    fullPage = source;

    displayFullScreen();
}
function displayFullScreen() {
    fullPage.style.top = window.scrollY + 'px';
    fullPage.style.display = 'block';
    body.classList.add('no-scroll');
}


function showFullScreenImage(source) {
    fullPage.innerHTML = `
        <div style="background-image: url('${source}'); background-size: contain; background-repeat: no-repeat; background-position: center center; width: 100%; height: 100%;">
        <img style="z-index: 9999999;" id="closeBtn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1klEQVR4nO2WWw6CMBBFZwsmkLiL/rh7cQd++EhwOccQx0QrmLYzoCG9CT+03HtoOzAiVVWRgAAcgEacBGyAPbBLmdzx0MkDYvBQr0FdKu1RHzhbICKv9BfCAaI4fMKgB7aSKKBVcNsqUgDhFl4CoeEXt/AciNnCJwJurxDRWNZ5MUMsFv5UFHjVC73XyhLiHeJjS9YNwC+3gJED9606Zg+X8TF/CBJKLfoE+5UjGXXuDkHBb9mtn8BgZIbA2kxYIHAIN0HwB01pUAjPtrxRz+DlWbUe3QF8yP/p2cX4sAAAAABJRU5ErkJggg==">
        </div>`;

    displayFullScreen();
}

const getImageCube = async () => {
    const response = await axios.get('https://memory.augustinenguyen.com/api/cubes?populate=*')
    const data = response.data.data
    const images = data.map(image => `<${image.attributes.Position.startsWith('in') ? 'span' : 'div'} class="${image.attributes.Position}">
    <img src="${image.attributes.Image.data.attributes.url}" class="${image.attributes.Position.startsWith('in') ? 'in_pic' : 'pic'}" />
</${image.attributes.Position.startsWith('in') ? 'span' : 'div'}>`)

    const element = document.getElementById('cubebox')
    element.innerHTML = images.join('')

}


const getText = async () => {
    const response = await axios.get('https://memory.augustinenguyen.com/api/text')
    const data = response.data.data
    const texts = data.attributes.Text.split('\n').map(text => `<span class="say">${text}</span><br>`)
    const element = document.getElementById('tamsutuoihong')
    element.innerHTML = texts.join('')

}

let isLoading = false;
let data = [];
let currentPage = 1;
let totalPage = 0
// Add event listener for infinite scroll

const colorList = [{ color: '#ffa705', class: "time_line_5cf90ca818f641" }, { color: '#3224e9', class: "time_line_5cf90ca818ffe5" }, { color: '#12affe', class: "time_line_5cf90ca818fe44" }, { color: '#69e9f2', class: "time_line_5cf90ca818fc83" }, { color: '#ff5600', class: "time_line_5cf90ca818fa82" }]
const getImage = async () => {
    if (isLoading) return;
    isLoading = true;
    const response = await axios.get(`https://memory.augustinenguyen.com/api/memories?populate=*&sort=StartDate:desc&pagination[page]=${currentPage}&pagination[pageSize]=20`);
    totalPage = response.data.meta.pagination.pageCount
    data = [ ...response.data.data, ...data];

    const display = data.map((memory, index) => {
        const color = colorList[Math.floor(Math.random() * colorList.length)];
        const html = converter.makeHtml(memory.attributes.Detail);
        const truncatedDetail = html.length > 200
        ? html.substring(0, 200) + '...'
        : html;
          

        return `
        <div id=${color.class} class="time_line-item item_show  ${index === 0 ? 'item_active' : ''}">
<div class="time_line-date_wrap">
    <div class="seofy_hexagon"><svg style=" fill: ${color.color};" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 177.4 197.4">
            <path
                d="M0,58.4v79.9c0,6.5,3.5,12.6,9.2,15.8l70.5,40.2c5.6,3.2,12.4,3.2,18,0l70.5-40.2c5.7-3.2,9.2-9.3,9.2-15.8V58.4 c0-6.5-3.5-12.6-9.2-15.8L97.7,2.4c-5.6-3.2-12.4-3.2-18,0L9.2,42.5C3.5,45.8,0,51.8,0,58.4z">
            </path>
        </svg></div>
    <div class="seofy_hexagon"><svg style="filter: drop-shadow(4px 5px 4px  ${color.color}); fill: ${color.color};"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.4 197.4">
            <path
                d="M0,58.4v79.9c0,6.5,3.5,12.6,9.2,15.8l70.5,40.2c5.6,3.2,12.4,3.2,18,0l70.5-40.2c5.7-3.2,9.2-9.3,9.2-15.8V58.4 c0-6.5-3.5-12.6-9.2-15.8L97.7,2.4c-5.6-3.2-12.4-3.2-18,0L9.2,42.5C3.5,45.8,0,51.8,0,58.4z">
            </path>
        </svg></div>
    <h4 class="time_line-date">${dayjs(memory.attributes.StartDate).format('DD/MM/YYYY')}</h4>
</div>
<div class="time_line-content">
    <h4 class="time_line-title">${memory.attributes.Title} </h4>
    <h5 style="margin-top:10px">(${dayjs(memory.attributes.StartDate).format('DD/MM/YYYY')}) </h5>
    <div class="time_line-descr">${truncatedDetail}
    ${memory.attributes.Detail.length > 100
                ? `<br/> <span class="see-more" onclick="showFullDetail(${index})">Ấn để xem thêm nhìu iu thưn :></span>`
                : ''}
</div>

    <br />
    ${memory.attributes?.ImagesAndVideo?.data ? `<div class="slider slider${index}">
        <div class="slide_viewer">
            <div class="slide_group slide_group${index}">
                ${memory.attributes?.ImagesAndVideo?.data?.map(d => {

                    const media = d.attributes.provider_metadata.resource_type === 'video' ? `
                    <video controls style="
                   ">
                <source src="${d.attributes.url}" type=${d.attributes.mime}>
                </video>

                    ` : `<img style="cursor: pointer;" src="${d.attributes.url}" /> `

                    return `<div class="slide slide${index}">
                    ${media}
                    
                    </div>`
                }).join('')}
            </div>
        </div>
    </div>

    <div class="slide_buttons slide_buttons${index}">
    </div>

    <div class="directional_nav">
        <div class="previous_btn previous_btn${index}" title="Previous">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" width="22px" height="22px" viewBox="-11 -11.5 65 66">
                <g>
                    <g>
                        <path fill="#474544"
                            d="M-10.5,22.118C-10.5,4.132,4.133-10.5,22.118-10.5S54.736,4.132,54.736,22.118
        c0,17.985-14.633,32.618-32.618,32.618S-10.5,40.103-10.5,22.118z M-8.288,22.118c0,16.766,13.639,30.406,30.406,30.406 c16.765,0,30.405-13.641,30.405-30.406c0-16.766-13.641-30.406-30.405-30.406C5.35-8.288-8.288,5.352-8.288,22.118z" />
                        <path fill="#474544"
                            d="M25.43,33.243L14.628,22.429c-0.433-0.432-0.433-1.132,0-1.564L25.43,10.051c0.432-0.432,1.132-0.432,1.563,0	c0.431,0.431,0.431,1.132,0,1.564L16.972,21.647l10.021,10.035c0.432,0.433,0.432,1.134,0,1.564	c-0.215,0.218-0.498,0.323-0.78,0.323C25.929,33.569,25.646,33.464,25.43,33.243z" />
                    </g>
                </g>
            </svg>
        </div>
        <div class="next_btn next_btn${index}" title="Next"> 
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" width="22px" height="22px" viewBox="-11 -11.5 65 66">
                <g>
                    <g>
                        <path fill="#474544"
                            d="M22.118,54.736C4.132,54.736-10.5,40.103-10.5,22.118C-10.5,4.132,4.132-10.5,22.118-10.5	c17.985,0,32.618,14.632,32.618,32.618C54.736,40.103,40.103,54.736,22.118,54.736z M22.118-8.288	c-16.765,0-30.406,13.64-30.406,30.406c0,16.766,13.641,30.406,30.406,30.406c16.768,0,30.406-13.641,30.406-30.406 C52.524,5.352,38.885-8.288,22.118-8.288z" />
                        <path fill="#474544"
                            d="M18.022,33.569c 0.282,0-0.566-0.105-0.781-0.323c-0.432-0.431-0.432-1.132,0-1.564l10.022-10.035 			L17.241,11.615c 0.431-0.432-0.431-1.133,0-1.564c0.432-0.432,1.132-0.432,1.564,0l10.803,10.814c0.433,0.432,0.433,1.132,0,1.564 L18.805,33.243C18.59,33.464,18.306,33.569,18.022,33.569z" />
                    </g>
                </g>
            </svg>
        </div>
    </div>` : ""
            }
    
</div>
</div>
        `
    })
    const element = document.getElementById('time_line_item_list')
    element.innerHTML = display.join('')
    const currentIndex = data.map(d => 0)
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function () {
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2 && !this.full);
        }
    })
    data.map((d, index) => {
        $(`.slider${index}`).each(function () {
            let $this = $(this);
            let $group = $this.find(`.slide_group${index}`);
            let $slides = $this.find(`.slide${index}`);
            let bulletArray = [];

            let timeout;

            function move(newIndex) {
                if (fullPage.style.display === 'block') {
                    return
                }
                if (document.querySelector(`.slider${index} video`)?.playing) {
                    return
                }


                let animateLeft, slideLeft;

                advance();

                if ($group.is(':animated') || currentIndex[index] === newIndex) {
                    return;
                }
                bulletArray[currentIndex[index]].removeClass('active');
                bulletArray[newIndex].addClass('active');

                if (newIndex > currentIndex[index]) {
                    slideLeft = '100%';
                    animateLeft = '-100%';
                } else {
                    slideLeft = '-100%';
                    animateLeft = '100%';
                }

                $slides.eq(newIndex).css({
                    display: 'block',
                    left: slideLeft
                });
                $group.animate({
                    left: animateLeft
                }, function () {
                    $slides.eq(currentIndex[index]).css({
                        display: 'none'
                    });
                    $slides.eq(newIndex).css({
                        left: 0
                    });
                    $group.css({
                        left: 0
                    });
                    currentIndex[index] = newIndex;
                });
            }

            function advance() {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    if (currentIndex[index] < ($slides.length - 1)) {
                        move(currentIndex[index] + 1);
                    } else {
                        move(0);
                    }
                }, 4000);
            }

            $(`.next_btn${index}`).on('click', function () {
                if (currentIndex[index] < ($slides.length - 1)) {
                    move(currentIndex[index] + 1);
                } else {
                    move(0);
                }
            });

            $(`.previous_btn${index}`).on('click', function () {
                if (currentIndex[index] !== 0) {
                    move(currentIndex[index] - 1);
                } else {
                    move($slides.length - 1);
                }
            });

            $.each($slides, function (index1) {
                var $button = $('<a class="slide_btn">&bull;</a>');

                if (index1 === currentIndex[index]) {
                    $button.addClass('active');
                }
                $button.on('click', function () {
                    move(index1);
                }).appendTo(`.slide_buttons${index}`);

                bulletArray.push($button);
            });

            advance();
        });
    })
    isLoading = false;
    currentPage++;



    const mediaElements = document.querySelectorAll('.wrap2 img, .wrap2 video, .chat-history img, .chat-history video');


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

}
getImageCube()
getText()
getImage()
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && currentPage <= totalPage) {
        // You may need to adjust the condition based on your specific layout
        getImage();
    }
});

function closeFullScreen() {
    fullPage.style.display = 'none';

    // Remove class from body to enable scrolling
    body.classList.remove('no-scroll');
}

