import { User } from "@clerk/nextjs/server";

 const getInitials = (user: User | null) => {
    if (!user) return "US"; 

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    const firstInitial = firstName.trim().charAt(0).toUpperCase();
    const lastInitial = lastName.trim().charAt(0).toUpperCase();

    if (firstName && lastName) {
      return firstInitial + lastInitial;
    } else if (firstName) {
      return firstInitial;
    } else if (lastName) {
      return lastInitial;
    } else {
      return "US";
    }
  };

   export default getInitials;