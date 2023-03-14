function addBadges(badgeNames) {
   const badgeMap = {
      ActiveDeveloper: "<:activedeveloper:1083858711463862448>",
      BugHunterLevel1: "<:discordbughunter1:1083858720267702365>",
      BugHunterLevel2: "<:discordbughunter2:1083858722507468820>",
      PremiumEarlySupporter: "<:discordearlysupporter:1083858726232019104>",
      Partner: "<:discordpartner:1083858735069397043>",
      Staff: "<:discordstaff:1083858738236108860>",
      HypeSquadOnlineHouse1: "<:hypesquadbravery:1083858743822925824>", // Hypesquad Bravery
      HypeSquadOnlineHouse2: "<:hypesquadbrilliance:1083858747648127006>", // Hypesquad Brilliance
      HypeSquadOnlineHouse3: "<:hypesquadbalance:1083858740266160279>", // Hypesquad Balance
      Hypesquad: "<:hypesquadevents:1083858749812387890>",
      CertifiedModerator: "<:discordmod:1083858729855885504>",
      VerifiedDeveloper: "<:discordbotdev:1083858716970987580>",
   };

   return badgeNames.map(badgeName => badgeMap[badgeName] || "❔");
}

module.exports = { addBadges };
