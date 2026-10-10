/* =========================================================
   script.js
   ระบบโต้ตอบเว็บไซต์หนังสือ
   - หมุนภาพ 360°
   - เลื่อนรูปสินค้า
   - ขยายรูปสินค้า
   - เลื่อนตัวอย่างเสียง
   - เลื่อนรูปตัวอย่างเสียง
   - ภาพใหญ่และภาพเล็กเลื่อนตรงกัน
========================================================= */

/* =========================================================
   SECTION 3
   PRODUCT IMAGE GALLERY
   - รูปใหญ่
   - รูปเล็ก 7 รูป
   - ปุ่มซ้าย / ขวา
   - ปุ่มเลื่อนรูปเล็ก
   - Zoom
========================================================= */


/* ---------------------------------------------------------
   รายการรูปทั้ง 7 รูป
   ใช้ไฟล์เดียวกับรูปเล็กที่คุณมีจริง
--------------------------------------------------------- */

const productImages = [
    "images/เนื้อหา1.webp",
    "images/เนื้อหา2.webp",
    "images/เนื้อหา3.webp",
    "images/เนื้อหา4.webp",
    "images/เนื้อหา5.webp",
    "images/เนื้อหา6.webp",
    "images/เนื้อหา7.webp"
];


/* ---------------------------------------------------------
   ดึง Element จาก HTML
--------------------------------------------------------- */

const mainProductImage =
    document.getElementById("mainProductImage");

const prevImageButton =
    document.getElementById("prevImage");

const nextImageButton =
    document.getElementById("nextImage");

const zoomButton =
    document.getElementById("zoomButton");

const thumbnailList =
    document.getElementById("thumbnailList");

const thumbnailPrev =
    document.getElementById("thumbnailPrev");

const thumbnailNext =
    document.getElementById("thumbnailNext");

const thumbnails =
    document.querySelectorAll(".thumbnail");


/* รูปที่กำลังแสดง */

let currentProductImage = 0;


/* =========================================================
   เปลี่ยนรูปใหญ่
========================================================= */

function changeProductImage(index) {

    /* ถ้าเลยรูปสุดท้าย */
    if (index >= productImages.length) {
        index = 0;
    }

    /* ถ้าย้อนก่อนรูปแรก */
    if (index < 0) {
        index = productImages.length - 1;
    }


    currentProductImage = index;


    /* เปลี่ยนรูปใหญ่ */

    if (mainProductImage) {

        mainProductImage.src =
            productImages[currentProductImage];

    }


    /* เปลี่ยนรูปเล็กที่ active */

    thumbnails.forEach(
        (thumbnail, i) => {

            thumbnail.classList.toggle(
                "active",
                i === currentProductImage
            );

        }
    );

    /* เลื่อนเฉพาะแถบรูปเล็ก ไม่เลื่อนทั้งหน้าเว็บ */

    if (thumbnailList && thumbnails[currentProductImage]) {

    const thumbnail = thumbnails[currentProductImage];

    thumbnailList.scrollTo({
        left: thumbnail.offsetLeft - thumbnailList.offsetLeft,
        behavior: "smooth"
    });

}
   

}


/* =========================================================
   ปุ่มรูปใหญ่ ←
========================================================= */

if (prevImageButton) {

    prevImageButton.addEventListener(
        "click",
        function () {

            changeProductImage(
                currentProductImage - 1
            );

        }
    );

}


/* =========================================================
   ปุ่มรูปใหญ่ →
========================================================= */

if (nextImageButton) {

    nextImageButton.addEventListener(
        "click",
        function () {

            changeProductImage(
                currentProductImage + 1
            );

        }
    );

}


/* =========================================================
   คลิกรูปเล็ก
========================================================= */

thumbnails.forEach(
    (thumbnail, index) => {

        thumbnail.addEventListener(
            "click",
            function () {

                changeProductImage(index);

            }
        );

    }
);


/* =========================================================
   ปุ่ม ← ของแถบรูปเล็ก
========================================================= */

if (thumbnailPrev && thumbnailList) {

    thumbnailPrev.addEventListener(
        "click",
        function () {

            thumbnailList.scrollBy({
                left: -180,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ปุ่ม → ของแถบรูปเล็ก
========================================================= */

if (thumbnailNext && thumbnailList) {

    thumbnailNext.addEventListener(
        "click",
        function () {

            thumbnailList.scrollBy({
                left: 180,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ZOOM
   สร้างหน้าต่าง Zoom ด้วย JavaScript
   ไม่จำเป็นต้องเพิ่ม HTML
========================================================= */


/* สร้างหน้าต่าง Zoom */

const zoomOverlay =
    document.createElement("div");

zoomOverlay.id =
    "imageZoomOverlay";


/* HTML ของ Zoom */

zoomOverlay.innerHTML = `

    <button
        id="closeZoom"
        class="close-zoom">
        ×
    </button>

    <img
        id="zoomedProductImage"
        src=""
        alt="ภาพขยายหนังสือ">

`;


/* ใส่ Zoom ลงในหน้าเว็บ */

document.body.appendChild(
    zoomOverlay
);


/* ดึง Element */

const zoomedProductImage =
    document.getElementById(
        "zoomedProductImage"
    );

const closeZoom =
    document.getElementById(
        "closeZoom"
    );


/* =========================================================
   เปิด Zoom
========================================================= */

function openProductZoom() {

    if (!mainProductImage) return;


    zoomedProductImage.src =
        mainProductImage.src;


    zoomOverlay.classList.add(
        "show"
    );

}


/* =========================================================
   ปุ่มขยาย ⛶
========================================================= */

if (zoomButton) {

    zoomButton.addEventListener(
        "click",
        function () {

            openProductZoom();

        }
    );

}


/* =========================================================
   กดรูปใหญ่เพื่อ Zoom
========================================================= */

if (mainProductImage) {

    mainProductImage.addEventListener(
        "click",
        function () {

            openProductZoom();

        }
    );

}


/* =========================================================
   ปิด Zoom
========================================================= */

closeZoom.addEventListener(
    "click",
    function () {

        zoomOverlay.classList.remove(
            "show"
        );

    }
);


/* คลิกพื้นที่มืดด้านนอกเพื่อปิด */

zoomOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === zoomOverlay) {

            zoomOverlay.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   ปุ่ม ESC เพื่อปิด Zoom
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            zoomOverlay.classList.contains("show")
        ) {

            zoomOverlay.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   เริ่มต้นที่รูปที่ 1
========================================================= */

changeProductImage(0);




/* =========================================================
   3. 360° VIEWER
   หมุนภาพโดยการลากเมาส์ / ปัดนิ้ว
========================================================= */

const viewer360 =
    document.getElementById("viewer360");

const image360 =
    document.getElementById("image360");

const prev360 =
    document.getElementById("prev360");

const next360 =
    document.getElementById("next360");


/*
   เปลี่ยนจำนวนภาพตรงนี้ตามจำนวนภาพ 360°
   
   ตัวอย่าง:
   360/
      01.jpg
      02.jpg
      03.jpg
      ...
      36.jpg
*/

const total360Images = 36;

let current360Image = 1;

let isDragging360 = false;
let startX360 = 0;


/* =========================================================
   โหลดภาพ 360°
========================================================= */

function show360Image(number) {

    if (!image360) return;


    if (number < 1) {
        number = total360Images;
    }

    if (number > total360Images) {
        number = 1;
    }


    current360Image = number;


    const imageNumber =
        String(current360Image).padStart(2, "0");


    image360.src =
        `images/360/${imageNumber}.jpg`;

}


/* =========================================================
   หมุน 360° ไปทางซ้าย
========================================================= */

function previous360Image() {

    show360Image(
        current360Image - 1
    );

}


/* =========================================================
   หมุน 360° ไปทางขวา
========================================================= */

function next360Image() {

    show360Image(
        current360Image + 1
    );

}


/* ปุ่มหมุน */

if (prev360) {

    prev360.addEventListener(
        "click",
        previous360Image
    );

}


if (next360) {

    next360.addEventListener(
        "click",
        next360Image
    );

}


/* =========================================================
   ลากเมาส์เพื่อหมุน 360°
========================================================= */

if (viewer360) {

    viewer360.addEventListener(
        "mousedown",
        function (event) {

            isDragging360 = true;

            startX360 = event.clientX;

            viewer360.classList.add("dragging");

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!isDragging360) return;

            const difference =
                event.clientX - startX360;


            /* ความไวในการหมุน */

            if (Math.abs(difference) >= 10) {

                if (difference > 0) {

                    previous360Image();

                } else {

                    next360Image();

                }

                startX360 = event.clientX;

            }

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            isDragging360 = false;

            viewer360.classList.remove("dragging");

        }
    );

}


/* =========================================================
   ปัดนิ้วบนมือถือ
========================================================= */

if (viewer360) {

    viewer360.addEventListener(
        "touchstart",
        function (event) {

            startX360 =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    viewer360.addEventListener(
        "touchmove",
        function (event) {

            const currentX =
                event.touches[0].clientX;

            const difference =
                currentX - startX360;


            if (Math.abs(difference) >= 10) {

                if (difference > 0) {

                    previous360Image();

                } else {

                    next360Image();

                }

                startX360 = currentX;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   4. AUDIO / SAMPLE GALLERY
   ส่วนตัวอย่างเสียง
========================================================= */


/*
   รูปและเสียงต้องมี index ตรงกัน

   ตัวอย่าง:

   audio/
      sample-01.mp3
      sample-02.mp3
      sample-03.mp3

   images/
      audio-01.jpg
      audio-02.jpg
      audio-03.jpg
*/

const audioSamples = [

    {
        image: "images/audio-01.jpg",
        audio: "audio/sample-01.mp3"
    },

    {
        image: "images/audio-04.jpg",
        audio: "audio/sample-04.mp3"
    },

    {
        image: "images/audio-39.jpg",
        audio: "audio/sample-39.mp3"
    },

    {
        image: "images/audio-44.jpg",
        audio: "audio/sample-44.mp3"
    }

];


let currentAudioSample = 0;


/* Element รูปตัวอย่างเสียง */

const audioSampleImage =
    document.getElementById("audioSampleImage");


/* Element เครื่องเล่นเสียง */

const audioPlayer =
    document.getElementById("audioPlayer");


/* ปุ่มก่อนหน้า / ถัดไป */

const prevAudio =
    document.getElementById("prevAudio");

const nextAudio =
    document.getElementById("nextAudio");


/* =========================================================
   เปลี่ยนตัวอย่างเสียง
========================================================= */

function changeAudioSample(index) {

    if (audioSamples.length === 0) return;


    if (index < 0) {

        index =
            audioSamples.length - 1;

    }


    if (index >= audioSamples.length) {

        index = 0;

    }


    currentAudioSample = index;


    const sample =
        audioSamples[currentAudioSample];


    /* เปลี่ยนรูป */

    if (audioSampleImage) {

        audioSampleImage.src =
            sample.image;

    }


    /* เปลี่ยนไฟล์เสียง */

    if (audioPlayer) {

        audioPlayer.src =
            sample.audio;

        audioPlayer.load();

    }

}


/* =========================================================
   ตัวอย่างเสียงก่อนหน้า
========================================================= */

function previousAudioSample() {

    changeAudioSample(
        currentAudioSample - 1
    );

}


/* =========================================================
   ตัวอย่างเสียงถัดไป
========================================================= */

function nextAudioSample() {

    changeAudioSample(
        currentAudioSample + 1
    );

}


/* =========================================================
   ปุ่ม Audio
========================================================= */

if (prevAudio) {

    prevAudio.addEventListener(
        "click",
        previousAudioSample
    );

}


if (nextAudio) {

    nextAudio.addEventListener(
        "click",
        nextAudioSample
    );

}


/* =========================================================
   5. AUDIO THUMBNAILS
   ถ้ามีรูปเล็กสำหรับตัวอย่างเสียง
========================================================= */

const audioThumbnails =
    document.querySelectorAll(".audio-thumbnail");


audioThumbnails.forEach(
    function (thumbnail, index) {

        thumbnail.addEventListener(
            "click",
            function () {

                changeAudioSample(index);


                audioThumbnails.forEach(
                    function (item, i) {

                        item.classList.toggle(
                            "active",
                            i === index
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   6. KEYBOARD CONTROL
   ใช้ลูกศรซ้าย/ขวาเลื่อนรูปสินค้า
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           ถ้ากำลังพิมพ์ใน input
           ไม่ต้องเปลี่ยนรูป
        */

        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {

            return;

        }


        if (event.key === "ArrowLeft") {

            previousProductImage();

        }


        if (event.key === "ArrowRight") {

            nextProductImage();

        }


        if (
            event.key === "Escape" &&
            imageZoomModal
        ) {

            imageZoomModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   7. INITIALIZE
   กำหนดรูปแรกเมื่อเปิดเว็บไซต์
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* รูปสินค้าเริ่มที่รูปที่ 1 */

        changeProductImage(0);


        /* ตัวอย่างเสียงเริ่มที่รายการแรก */

        changeAudioSample(0);


        /* 360° เริ่มที่ภาพแรก */

        show360Image(1);

    }
);

/* =========================================================
   SECTION 4 : HORROR AUDIO SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const audioPrev = document.getElementById("audioPrev");
    const audioNext = document.getElementById("audioNext");

    const audioCards = document.querySelectorAll(".audio-card");

    let currentAudio = 0;


    /* ถ้าไม่มี Audio Card ให้หยุด */
    if (audioCards.length === 0) {
        return;
    }


    /* -----------------------------------------
       แสดงเรื่องที่เลือก
    ----------------------------------------- */

    function showAudioStory(index) {

        /* วนจากเรื่องสุดท้ายกลับเรื่องแรก */
        if (index < 0) {
            index = audioCards.length - 1;
        }

        /* วนจากเรื่องแรกไปเรื่องสุดท้าย */
        if (index >= audioCards.length) {
            index = 0;
        }

        currentAudio = index;


        /* แสดงทีละ 1 เรื่อง */

        audioCards.forEach(function (card, i) {

            if (i === currentAudio) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });


        /* หยุดเสียงทุกตัวก่อน */

        const allAudio =
            document.querySelectorAll("#audio audio");

        allAudio.forEach(function (audio) {

            audio.pause();

            audio.currentTime = 0;

        });

    }


    /* -----------------------------------------
       ปุ่ม ←
    ----------------------------------------- */

    if (audioPrev) {

        audioPrev.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showAudioStory(currentAudio - 1);

        });

    }


    /* -----------------------------------------
       ปุ่ม →
    ----------------------------------------- */

    if (audioNext) {

        audioNext.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showAudioStory(currentAudio + 1);

        });

    }


    /* -----------------------------------------
       เริ่มต้นที่เรื่องแรก
    ----------------------------------------- */

    showAudioStory(0);

});

/* =========================================================
   360 DEGREE BOOK
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const book360 = document.getElementById("book360");
    const book360Image = document.getElementById("book360Image");

    const rotateLeft = document.getElementById("rotateLeft");
    const rotateRight = document.getElementById("rotateRight");

    if (!book360 || !book360Image) {
        return;
    }


    /* จำนวนภาพจริง */
    const total360Images = 12;

    let current360 = 1;


    /* =====================================================
       เปลี่ยนภาพ 360°
    ===================================================== */

    function show360Image(number) {

        if (number < 1) {
            number = total360Images;
        }

        if (number > total360Images) {
            number = 1;
        }

        current360 = number;

        const imageNumber =
            String(current360).padStart(2, "0");

        book360Image.src =
            `images/360/360-${imageNumber}.png`;
    }


    /* =====================================================
       ปุ่มหมุนซ้าย
    ===================================================== */

    if (rotateLeft) {

        rotateLeft.addEventListener("click", function () {

            show360Image(current360 - 1);

        });

    }


    /* =====================================================
       ปุ่มหมุนขวา
    ===================================================== */

    if (rotateRight) {

        rotateRight.addEventListener("click", function () {

            show360Image(current360 + 1);

        });

    }


    /* =====================================================
       ลากเมาส์เพื่อหมุน
    ===================================================== */

    let isDragging = false;
    let startX = 0;


    book360.addEventListener("mousedown", function (event) {

        isDragging = true;
        startX = event.clientX;

        book360.classList.add("dragging");

    });


    document.addEventListener("mousemove", function (event) {

        if (!isDragging) {
            return;
        }

        const distance =
            event.clientX - startX;


        if (Math.abs(distance) >= 15) {

            if (distance > 0) {

                show360Image(current360 - 1);

            } else {

                show360Image(current360 + 1);

            }

            startX = event.clientX;

        }

    });


    document.addEventListener("mouseup", function () {

        isDragging = false;

        book360.classList.remove("dragging");

    });


    /* =====================================================
       รองรับมือถือ
    ===================================================== */

    let startTouchX = 0;


    book360.addEventListener(
        "touchstart",
        function (event) {

            startTouchX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    book360.addEventListener(
        "touchmove",
        function (event) {

            const currentTouchX =
                event.touches[0].clientX;

            const distance =
                currentTouchX - startTouchX;


            if (Math.abs(distance) >= 15) {

                if (distance > 0) {

                    show360Image(current360 - 1);

                } else {

                    show360Image(current360 + 1);

                }

                startTouchX = currentTouchX;

            }

        },
        { passive: true }
    );


    /* =====================================================
       เริ่มต้นภาพที่ 1
    ===================================================== */

    show360Image(1);

});
