/**
 * Theme
 * =======
 */
function changeTheme() {
    var pref = _hb.getColorModePreference();
    var mode = 'os';
    if (pref === 'os') {
        mode = 'dark';
    } else if (pref === 'dark') {
        mode = 'light';
    }
    _hb.changeColorMode(mode);
}