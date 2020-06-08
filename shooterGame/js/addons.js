Phaser.Scene.prototype.fadeOut = function(target, y, duration=2000, onComplete=()=>{}, alpha=0, ease='Quart.easeOut') {
    this.tweens.add({
        targets: target,
        y: y,
        ease: ease,
        repeat: 0,
        duration: duration,
        alpha: alpha,
        onComplete: onComplete,
    });
}

Phaser.Scene.prototype.fadeIn = function(target, y, duration=2000, onComplete=()=>{}, alpha=1, ease='Quart.easeOut') {
    this.tweens.add({
        targets: target,
        y: y,
        ease: ease,
        repeat: 0,
        duration: duration,
        alpha: alpha,
        onComplete: onComplete,
    });
}