/**
 * @name RandomDiscordTools
 * @authorId 162970149857656832
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	let shell = WScript.CreateObject("WScript.Shell");
	let fs = new ActiveXObject("Scripting.FileSystemObject");
	let pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	let pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();
@else@*/

let RandomDiscordTools = (() => {
    const config = {info:
    {name:"RandomDiscordTools",authors:[{name:"RazerMoon",discord_id:"162970149857656832"}],
    version:"0.6.0",
    description:"A plugin for Bandaged BetterDiscord that has some random, potentially useful tools."},
    changelog:[
        {
            title: "New Features",
            type: "added",
            items: ["New info button so you don't have to click on a message header anymore"]
        },
        {
            title: "Improvements",
            type: "improved",
            items: ["The onClick() function now takes target as input instead of e"]
        },
    ]
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            const title = "Library Missing";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function(props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [BdApi.React.createElement(TextElement, {color: TextElement.Colors.PRIMARY, children: [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`]})],
                    red: false,
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
    const {Modals, DiscordModules, Settings, PluginUtilities} = Api;
    const {SettingPanel, SettingField, Textbox, Dropdown, Switch} = Settings;
    const {React} = DiscordModules;

    class FireLog {
        constructor(server, channel) {
            this.css = {
                group: "font-size: 200%; color: pink; ffont-weight: bold; background-color: black;",
                object: "font-size: 100%; color: pink; ffont-weight: bold; background-color: black;",
            }
            this.owner = (e) => {let l = BdApi.findModuleByProps("getUser").getUser(e); if (typeof l != 'undefined') return l.tag; else return "error"};
        }

        log(server, channel, user) {

            console.groupCollapsed('%cRandomDiscordTools 🔥', this.css.group);

            try {
            if (typeof server.name != 'undefined') {
                try {
                    console.group("Server:", server.name);
                        console.log("Name:", server.name);
                        console.log("Server Id:", server.id);
                        console.log("Description:", server.description);
                        console.log("Owner:", this.owner(server.ownerId));
                        console.log("Owner's Id:", server.ownerId);
                        console.log("Joined At:", server.joinedAt);
                        console.log("Server Location:", server.region);
                        console.groupCollapsed("%cFull object 👇", this.css.object);
                            console.log(server);
                        console.groupEnd();
                    console.groupEnd();
                }
                catch(err) {
                console.info("No server passed");
                }
            }
            }
            catch(err) {
                console.info("No server passed")
            }   

            try {
            if (typeof channel.name != 'undefined') {
                try {
                    console.group("Channel:", channel.name);
                        console.log("Name:", channel.name);
                        console.log("Server Id:", channel.guild_id);
                        console.log("Channel Id:", channel.id);
                        console.log("Topic:", channel.topic);
                        console.groupCollapsed("%cFull object 👇", this.css.object);
                            console.log(channel);
                        console.groupEnd();
                    console.groupEnd();
                }
                catch(err) {
                    console.info("No channel passed");
                }
            }
            }
            catch(err) {
                console.info("No channel passed")
            }   

            try {
            if (typeof user.username != 'undefined') {
                try {
                    console.group("User:", user.username);
                        console.log("Name:", user.username);
                        console.log("User Id:", user.id);
                        console.log("Tag:", user.tag);
                        console.log("Created at:", user.createdAt);
                        console.groupCollapsed("%cFull object 👇", this.css.object);
                            console.log(user);
                        console.groupEnd();
                    console.groupEnd();
                }
                catch(err) {
                    console.info("No user passed");
                }
            }
            }
            catch(err) {
                console.info("No user passed")
            }
            console.groupEnd();

        }

    };

    class DisplayChangelog extends React.Component {
        constructor(props) {
            super(props);
            this.p = props
        }
        render() {
            return React.createElement(
                'div',
                {class: "flex-1O1GKY"},
                    [React.createElement(
                        'button',
                        {type: "button", id: "F_ChangelogButton", class: `button-38aScr iconWrapper-2OrFZ1 da-button lookFilled-1Gx00P ${this.p.col} sizeSmall-2cSMqn grow-q77ONN da-grow`},
                        "Changelog"
                    )]
            )
    }
    };

    class InfoButton { //Credit to Egrodo for base
        constructor() {
            this.btnReference = null;
            this.tooltipReference = null;

            this.onButtonMouseOut = this.onButtonMouseOut.bind(this);
            this.onButtonMouseOver = this.onButtonMouseOver.bind(this);
        }

        destructor() {
            try {
                this.btnReference.removeEventListener('mouseenter', this.onButtonMouseOver);
                this.btnReference.removeEventListener('mouseleave', this.onButtonMouseOut);
                this.btnReference.parentNode.removeChild(this.btnReference);
                this.tooltipReference.parentNode.removeChild(this.tooltipReference);
            }
            catch(err) {
                return; //Nothing to destruct
            }
        }

        createButton(gear) {
            if (gear == true) {
            var button = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g><rect fill="none" id="canvas_background" height="22" width="22" y="-1" x="-1"/></g><g><path stroke="" fill-rule="evenodd" fill="currentColor" d="m10,0.564842c-5.17133,0 -9.370144,4.228447 -9.370144,9.435503s4.198814,9.435158 9.370144,9.435158c5.170987,0 9.370144,-4.228102 9.370144,-9.435503c0,-5.207056 -4.199157,-9.435503 -9.370144,-9.435503l0,0.000345zm0,2.059599c0.454389,0 0.834417,0.160939 1.156533,0.485095c0.322116,0.324363 0.481803,0.712218 0.481803,1.175642c0,0.480678 -0.159687,0.889237 -0.481803,1.207733s-0.702144,0.474467 -1.156533,0.474467c-0.448563,0 -0.834417,-0.161146 -1.156533,-0.485164c-0.322116,-0.324363 -0.492769,-0.728091 -0.492769,-1.197036c0,-0.451692 0.170653,-0.834716 0.492769,-1.1646c0.322116,-0.330229 0.707969,-0.496137 1.156533,-0.496137zm0,4.99277c0.408128,0 0.731957,0.142513 0.985195,0.420636c0.258721,0.272258 0.385511,0.613183 0.385511,1.024158l0,6.869242c0,0.410974 -0.12679,0.75121 -0.385511,1.0352c-0.253238,0.277779 -0.577067,0.420636 -0.985195,0.420636c-0.402645,0 -0.737097,-0.142858 -0.995818,-0.420636c-0.253238,-0.28399 -0.385854,-0.624226 -0.385854,-1.0352l0,-6.869242c0,-0.410974 0.132616,-0.7519 0.385854,-1.024158c0.258721,-0.278124 0.593173,-0.420636 0.995818,-0.420636z" id="path838"/></g></svg>`

            // Use flexMarginReset prop to find the selector for the taskbar row.
            const selector = (BdApi.findModuleByProps('flexMarginReset', 'flex').flex || '').split(' ')[0];
            if (!selector) {
              console.error('Info Button failed to start up: Selector not found?');
              return;
            }
        
            // Create my custom button and prepend it to the toolbar row.
            const row = document.querySelector(`.${selector}`);
            this.btnReference = row.firstElementChild.cloneNode(true);
            this.btnReference.firstElementChild.innerHTML = button;
            this.btnReference.firstElementChild.style.pointerEvents = 'none'; // Ignore pointer events to fix bug that was causing repeated clicks to be ignored.
            this.btnReference.setAttribute('aria-label', 'Print info to console');
            this.btnReference.id = 'RDTBtn';
            this.btnReference.addEventListener('mouseenter', this.onButtonMouseOver);
            this.btnReference.addEventListener('mouseleave', this.onButtonMouseOut);

            row.prepend(this.btnReference);

            this.createTooltip()
            }
            else {
                this.destructor()
            }
        }

        createTooltip() {
            // Also setup my recreated tooltip that uses Discord's classes.
            const tooltipClasses = BdApi.findModuleByProps('tooltipBottom');
        
            const wrapperDiv = document.createElement('div');
            wrapperDiv.style.visibility = 'hidden';
            wrapperDiv.style.position = 'absolute';
            wrapperDiv.style.zIndex = '10000';
            wrapperDiv.style.pointerEvents = 'none';
            this.tooltipReference = wrapperDiv;
        
            const textWrapper = document.createElement('div');
            textWrapper.className = [tooltipClasses.tooltip, tooltipClasses.tooltipTop, tooltipClasses.tooltipBlack].join(' ');
            textWrapper.innerText = `Print info to console`;
        
            const bottomArrow = document.createElement('div');
            bottomArrow.className = tooltipClasses.tooltipPointer;
        
            textWrapper.prepend(bottomArrow);
            wrapperDiv.appendChild(textWrapper);
            document.body.appendChild(wrapperDiv);
        }

        onButtonMouseOver({target}) {

            const { x, y } = target.getBoundingClientRect();
            const tooltipXPos = x + target.clientWidth / 2 - this.tooltipReference.offsetWidth / 2;
            const tooltipYPos = y - target.clientHeight - 8; // 8 being a constant amount of space to hover above the btn.
        
            this.tooltipReference.style.left = `${tooltipXPos}px`;
            this.tooltipReference.style.visibility = 'visible';
            this.tooltipReference.style.top = `${tooltipYPos}px`;
        
            this.tooltipReference.visibility = 'visible';
        }

        onButtonMouseOut() {
            this.tooltipReference.style.visibility = 'hidden';
        }

    }

    return class RandomDiscordTools extends Plugin {
        constructor() {
            super();

            this.c = {
                currentChannel : BdApi.findModuleByProps('getChannelId').getChannelId,
                currentGuildId : BdApi.findModuleByProps('getGuildId').getGuildId,
                getChannelById : BdApi.findModuleByProps('getChannel').getChannel,
                getServerById  : BdApi.findModuleByProps('getGuild').getGuild,
                getUserById    : BdApi.findModuleByProps("getUser").getUser,
                userId         : BdApi.findModuleByProps('getId').getId(),
                FL             : new FireLog(),
                IB             : new InfoButton(),
            }

            this.defaultSettings = {
                textserverid   : "",
                textserverid   : "",
                dropserverid   : "",
                textchannelid  : "",
                dropchannelid  : "",
                switchchannelid: false,
                switchserverid : false,
                switchuserid   : false,
                gear           : false,
            };
        }

        onClick({target}) {

            let FL = this.c.FL;

            if (target.id == "F_ChangelogButton") {
                Modals.showChangelogModal(`${this._config.info.name} has been updated!`, this.getVersion(), this._config.changelog);
                //let window = document.querySelectorAll(".root-1gCeng")[0]
                //let old = document.querySelectorAll(".scrollerWrap-2lJEkd")[7]
                //let news = document.createElement("img")
                //news.setAttribute("src", "https://www.goodfoodireland.ie/sites/default/files/styles/provider_photo_large/public/places/photos/1404/galway%20goat%20farm%202_0.jpg?itok=iOabX7PS")
                //news.setAttribute("height", "300")
                //window.insertBefore(news, old)
                //console.log(document.querySelectorAll(".root-1gCeng"))
            }


            if (this.settings.gear == true) {
                if (target.id == "RDTBtn") {

                    if (this.settings.switchserverid == false) {
                        var server = this.c.getServerById(this.settings.dropserverid);
                    }
                    else {
                        var server = this.c.getServerById(this.settings.textserverid);
                    }

                    if (this.settings.switchchannelid == false) {
                        var channel = this.c.getChannelById(this.settings.dropchannelid);
                    }
                    else {
                        var channel = this.c.getChannelById(this.settings.textchannelid);
                    }

                    if (this.settings.switchuserid == false) {
                        var user = this.c.getUserById(this.settings.dropuserid);
                    }
                    else {
                        var user = this.c.getUserById(this.settings.textuserid)
                    }

                    FL.log(server, channel, user);
                }
            }
            else {
                if (target.classList.contains("wrapper-1BJsBx")) {
                    let server = this.c.getServerById(this.c.currentGuildId());
                    FL.log(server, 0, 0)
                }

                if (target.classList.contains("name-3_Dsmg")) {
                    let channel = this.c.getChannelById(this.c.currentChannel());
                    FL.log(0, channel, 0)
                }

                if (target.classList.contains("wrapper-3t9DeA")) {
                   if (e.target.classList.contains("avatar-SmRMf2")) return;
                   let userid = target.attributes.user_by_bdfdb.value
                   FL.log(0, 0, this.c.getUserById(userid))
                }

                if (target.classList.contains("bd-addon-header")) {
                    const currentDir = BdApi.Plugins.folder;
                    let addon = target.parentNode.__reactInternalInstance$.return.stateNode.props.addon
                    let fileDir = require("path").resolve(`${currentDir}/${addon.filename}`)
                    console.log("Opening " + addon.filename)
                    require("electron").shell.openItem(fileDir);
                }

            }
        }
        
        displayAlert(e, t) {
            let n = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            let s = BdApi.findModuleByPrototypes("handleCancel", "handleSubmit", "handleMinorConfirm");
            if (t === 'but') {
                var t = [React.createElement('div',
                 {class: "flex-1O1GKY"},
                React.createElement('button',
                 {class:'primaryButton-2BsGPp da-primaryButton button-38aScr da-button lookFilled-1Gx00P colorBrand-3pXr91 sizeXlarge-2yFAlZ grow-q77ONN da-grow'},
                  "bruh"))]
            }

            n.push((n) => {
                let a = BdApi.React.createElement(s, Object.assign({
                    title: e,
                    body: t,
                    size: "small"
                }, n))
                return a
            })
            
        }

        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

        onStart() {
            document.addEventListener("click", this.listener = e => {this.onClick(e)});

            this.c.IB.createButton(this.settings.gear)

            //console.log(document.cookie)

            //console.log(this.getCookie("names"))

            //document.cookie = "names=Slim Shas; expires=Thu, 20 Dec 2020 12:00:00 UTC; path=/";

            //console.log(BdApi.alert)

            //this.displayAlert("Hello", "bu")
            //console.log(exec)

            //this.run('start "" "c:\\" ')

            //console.log(DiscordModules.ConfirmationModal)

            //console.log(DiscordClasses.Changelog)
            //console.log(ModalStack)

            //console.log(DiscordModules.ButtonData)
            //console.log(DiscordClassModules.Changelog)

            //Modals.showChangelogModal(`${this._config.info.name} has been updated!`, this.getVersion(), this._config.changelog);

            //console.log(BdApi.showConfirmationModal())

            //console.log(ReactComponents.getComponentByName("Emoji"))

            //const server = this.c.getServerById("351081433948880896");
            //console.log(BdApi.findAllModules((e) => {return e._isInitialized}))

            //console.log(DiscordModules.UserProfileModals.open("220905833431695361"));
            //React.createElement("a", {href: "https://google.com/", target: "_blank"}, "This is a link")
        }

        onStop() {
            document.removeEventListener("click", this.listener);
            
            this.c.IB.destructor();
        }

        getSettingsPanel() {
            let col = DiscordModules.ButtonData.ButtonColors;
            return SettingPanel.build(this.saveSettings.bind(this),
            
                // Server
            new SettingField("", "", () => {}, DisplayChangelog, {col: col.GREY}),

            new Switch("Automatic or Manual Selection", "OFF = Automatic, ON = Manual", this.settings.gear, (e) => {this.settings.gear = e; this.c.IB.createButton(this.settings.gear)}),
            
            new Textbox("Server", "Put in the id of the server you want to get information about.", this.settings.textserverid, (e) => {this.settings.textserverid = e;}),
            new Dropdown("Server", "Select the id of the server you want to get information about.", this.settings.dropserverid, [
                {label: "Better Discord 2", value: "280806472928198656"},
            ], (e) => {this.settings.dropserverid = e;}),
            new Switch("Dropdown or Textbox Server Input", "OFF = Dropdown, ON = Textbox", this.settings.switchserverid, (e) => {this.settings.switchserverid = e;}),

                // Channel
            new Textbox("Channel", "Put in the id of the channel you want to get information about.", this.settings.textchannelid, (e) => {this.settings.textchannelid = e;}),
            new Dropdown("Channel", "Select the id of the channel you want to get information about.", this.settings.dropchannelid, [
                {label: "Support", value: "280806472928198656"},
                {label: "CSS and Themes", value: "334930755736174592"},
            ], (e) => {this.settings.dropchannelid = e;}),
            new Switch("Dropdown or Textbox Channel Input", "OFF = Dropdown, ON = Textbox", this.settings.switchchannelid, (e) => {this.settings.switchchannelid = e;}),

                // User
            new Textbox("User", "Put in the id of the user you want to get information about.", this.settings.textuserid, (e) => {this.settings.textuserid = e;}),
            new Dropdown("User", "Select the id of the user you want to get information about.", this.settings.dropuserid, [
                {label: "Zerebos", value: "249746236008169473"},
                {label: "Lighty", value: "239513071272329217"},
            ], (e) => {this.settings.dropuserid = e;}),
            new Switch("Dropdown or Textbox User Input", "OFF = Dropdown, ON = Textbox", this.settings.switchuserid, (e) => {this.settings.switchuserid = e;})
            );
        }

    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/