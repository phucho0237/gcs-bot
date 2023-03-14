function addSuffix(num) {
   if (num % 100 >= 11 && num % 100 <= 13) return num + "th";

   switch (num % 10) {
      case 1:
         return num + "st";
      case 2:
         return num + "nd";
      case 3:
         return num + rd;
   }

   return num + "th";
}

module.exports = { addSuffix };
