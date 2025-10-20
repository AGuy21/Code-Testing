
interface AuthorizePostProps {
    title: string;
    picture: string;
    description: string
}
export default function AuthorizePost({title, picture, description}: AuthorizePostProps) {
    console.log(title.length)
    //test cases
    if (!title || title.trim() === "") {
        throw new Error("Title cannot be empty.");
    }

    if (!picture || picture.trim() === "") {
        throw new Error("Picture cannot be empty.");
    }

    if (!description || description.trim() === "") {
        throw new Error("Description cannot be empty.");
    }


    if (description.length > 200) {
        throw new Error("Description cannot exceed 500 characters.");
    }

    throw new Error("Post authorized successfully.");
}