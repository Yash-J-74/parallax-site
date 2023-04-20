const track = document.getElementById("img-track");
const container_start = document.getElementById("container-start");
const container_end = document.getElementById("container-end");


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    container_start.dataset.mouseDownAt = e.clientX;
    container_end.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    container_start.dataset.mouseDownAt = "0";
    container_end.dataset.mouseDownAt = "0";

    track.dataset.prevPercent = track.dataset.percent;
    container_start.dataset.prevPercent = container_start.dataset.percent;
    container_end.dataset.prevPercent = container_end.dataset.percent;
}

function calcPercent(element, e) {
    const mouseDist = parseFloat(element.dataset.mouseDownAt) - e.clientX, maxDist = window.innerWidth / 2;
    const percent = (mouseDist / maxDist) * -100;
    var nextPercent = parseFloat(element.dataset.prevPercent) + percent;
    nextPercent = Math.min(nextPercent, 0);
    nextPercent = Math.max(nextPercent, -100);
    element.dataset.percent = nextPercent;

    return nextPercent;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    if (container_start.dataset.mouseDownAt === "0") return;
    if (container_end.dataset.mouseDownAt === "0") return;

    var percent = calcPercent(track, e);

    track.animate({
        transform: `translate(${percent}%, -50%)`}, {duration: 1200, fill: "forwards"});

    for (const image of track.getElementsByClassName("image")) {
        image.animate({objectPosition: `${100 + percent}% 50%`}, {duration: 1200, fill: "forwards"});
    }

    container_start.style.opacity = `${100 - percent * -1.5}%`;
    container_start.style.transform = `scale(${1 - percent * -0.02})`;

    container_end.style.opacity = `${-50 + percent * -1.5}%`;
    container_end.style.transform = `scale(${percent * -0.02 - 1})`;
}

