import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({ email, password, fullName }) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log("error", error);
    throw new Error(error.message);
  }
  return data;
};

export const login = async ({ email, password }) => {
  let { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("error", error);
    throw new Error(error.message);
  }
  return { user, error };
};

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
  let datesToUpdate;
  if (password) datesToUpdate = { password };
  if (fullName) datesToUpdate = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(datesToUpdate);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const avatarName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) throw new Error(storageError.message);

  // ** updating user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}${
        import.meta.env.VITE_SP_STORAGE_CONNECTING_PATH
      }${avatarName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
};
