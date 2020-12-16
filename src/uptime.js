const os = require('os');

class uptime {
    constructor(_vscode) {
        console.log("uptime actived!");
        this.vscode = _vscode;
        this.init();
    }

    init() {
        var vscode = this.vscode;
        var StatusBarAlignment = vscode.StatusBarAlignment;
        var window = this.vscode.window;
        this.statusBar = window.createStatusBarItem(StatusBarAlignment.Right);
        var disposable = [];

        this.disposable = vscode.Disposable.from(disposable);
        this.statusBar.show();
        this.showUpTime();
        this.interval = setInterval(this.showUpTime, 60000);
    }

    calDate(_seconds) {
        var D = 0, DS = 86400,
            H = 0, HS = 3600,
            M = 0, MS = 60;
        const ori_seconds = _seconds;
        (_seconds > DS) && (D = parseInt(_seconds / DS)) && (_seconds = _seconds - D * DS);
        (_seconds > HS) && (_seconds < DS) && (H = parseInt(_seconds / HS)) && (_seconds = _seconds - H * HS);
        (_seconds > MS) && (_seconds < HS) && (M = parseInt(_seconds / MS)) && (_seconds = _seconds - M * MS);
        console.log(ori_seconds, D, H, M);
        return (D > 0 ? D + 'D ' : ' ') + (H > 0 ? H + 'H ' : ' ') + (M > 0 ? M + 'M ' : ' ');
    };

    showUpTime(){
        var show_uptime = os.uptime();
        var stat_str = this.calDate(show_uptime);
        this.statusBar.text = stat_str;
    }

    dispose() {
        clearInterval(this.interval);
        this.disposable.dispose();
        this.statusBar.dispose();
    }
}

module.exports = uptime;