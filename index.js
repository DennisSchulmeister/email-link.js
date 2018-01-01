/*
 * email-link.js (https://github.com/DennisSchulmeister/email-link.js)
 * © 2018  Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>
 * License of this file: ISC
 */
"use strict";

/**
 * This function looks for links in the current html document with e-mail
 * addresses and converts them into valid mailto: links. By default, if no
 * other selector is given, all <a data-email-address> elements are processed.
 * It is supposed that the link text contains the e-mail address with the
 * at-sign replaced by space, e.g.:
 *
 *   <a data-email-address>alice example.com</a>
 *
 * If the link text doesn't contain the e-mail address it can also be given
 * by the data-email-address attribute:
 *
 *   <a data-email-address="bob example.com">Send a message to Bob</a>
 *
 * This function tries to be a little bit clever as to disguise the @ sign
 * from possible spammers, in case they evaluate the JavaScript code before
 * scanning the DOM. However this might still not fool very clever spammers.
 * The hope is, they do a simple regex search or something like that in order
 * to get the low hanging fruit, only.
 *
 * @param {String} selector: CSS selector string to select all <a> elements
 *   which link to an e-mail address. Default: "a[data-email-address]"
 * @param {String} dataAttributeName: Name of the data attribute, which contains
 *   the e-mail address if the link text doesn't. Default: "emailAddress"
 */
function enableEmailLinks(selector, dataAttributeName) {
    selector = selector || "a[data-email-address]";
    dataAttributeName = dataAttributeName || "emailAddress";

    document.querySelectorAll(selector).forEach(link => {
        // Get the e-mail address and replace the space with an @ sign
        let email = link.dataset[dataAttributeName];
        if (email === "" || !email) email = link.innerHTML;

        if (!email.includes(" ") || email.includes("@")) return;

        // Fix the link text if it contains the e-mail address
        if (link.innerHTML === email) {
            // Disguise the @ sign a little bit, in case our spammer evaluates
            // the JavaScript before scanning the DOM. The spammer might be
            // clever enough to know that an e-mail address can't contain HTML
            // tags, but this still lets the user select and copy the address.
            //
            // A more clever solution would be to insert a new <style> tag
            // in the DOM like this:
            //
            //    let styleTag = document.createElement("style");
            //    styleTag.innerText = `.__atsign__:after { content: "@"; }`;
            //    document.querySelector("body").appendChild(styleTag);
            //
            // And then add <span class="__atsign__"><span>" where the @ shall
            // appear. This would disguise the @ sign even more, but the user
            // couldn't copy & paste it anymore.
            link.innerHTML = email.replace(" ", "<span>@</span>");
        }

        // Fix link target
        link.href = `javascript:location.href = "mailto:${email}".replace(" ", "@")`;
    });
}

export default {
    enableEmailLinks,
};
