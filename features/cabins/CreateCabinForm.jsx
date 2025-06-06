import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateRoom } from "./userCreateRoom";
import { useEditRoom } from "./useEditRoom";
import { sanitizeInput } from "../../utils/helpers";
import { useEffect, useState } from "react";

function CreateCabinForm({ roomToEdit = {}, closeModal }) {
  const [imagePreview, setImagePreview] = useState(null);
  const { editRoom, isEditing } = useEditRoom();
  const { id: editId, ...editValues } = roomToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createNewRoom } = useCreateRoom();

  const image = watch("image");

  useEffect(() => {
    if (!image) return;

    if (image instanceof FileList && image[0]) {
      const objectUrl = URL.createObjectURL(image[0]);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

     
  }, [image]);

  function onSubmitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editRoom(
        { newRoomData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    else {
      createNewRoom(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    }
  }

  const isWorking = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Room name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should be less then regular price",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          
          id="description"
          {...register("description", {
            required: "This field is required",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />
      </FormRow>

      <FormRow label="Room photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
            setValueAs: (value) => value && sanitizeInput(value),
          })}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Room preview"
            style={{ width: "100px", height: "100px", marginTop: "1rem" }}
          />
        )} 
      </FormRow>

      <FormRow> 
        <Button
          $variation="danger"
          $size="medium"
          type="reset"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium">
          {isEditSession ? "Edit room" : "Create room"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
