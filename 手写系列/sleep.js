function log() {
    console.log(1);
    sleep(1000);
    console.log(2);
}


log();


function sleep(time) {
    const start = new Date().getTime();

    while(new Date().getTime() - start < time) {
        continue;
    }
}

