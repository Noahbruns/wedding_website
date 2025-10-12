"use client";

const PasswordScreen = () => {
  return (
    <form
      action="/"
      className="mx-auto flex max-w-96 flex-col justify-center gap-3 p-10 align-middle"
    >
      <input
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.toUpperCase();
          document.cookie = "pw=" + e.currentTarget.value + ";max-age=604800";
        }}
        placeholder="PASSWORT"
        className="rounded-md bg-white p-3 text-center text-black outline-none"
      />
      <div>
        <button
          type="submit"
          className="block w-full rounded-md bg-white p-3 hover:bg-gray-300"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default PasswordScreen;
