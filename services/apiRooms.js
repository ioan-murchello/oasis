import supabase, { supabaseUrl } from "./supabase";

export const getRooms = async () => {
  let { data: rooms, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Could not fetch rooms");
  }
  return rooms;
};

export const deleteRoom = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) console.log(error);

  return data;
};

export const createEditRoom = async (newRoom, id) => {

  console.log(id, "id in createEditRoom");
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages//${imageName}`;

  let query = supabase.from("cabins");
  
  if (!id) {
    query = query.insert([{ ...newRoom, image: imagePath }]).select();
  }

  if (id) {
    query = query
      .update({ ...newRoom, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data: rooms, error } = await query.select().single();

  if (error) {
    console.error("Supabase Error:", error.message);
    throw new Error(error.message); // 🔥 This makes React Query handle errors properly
  }

  if (hasImagePath) return rooms;

  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newRoom.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newRoom.id);
  }

  return rooms;
};
