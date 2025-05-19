export interface Like {
    id: string,
    userId: string,
    likedAt: string
}

export interface User {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
}

export interface Posts {
    id: string,
    user: User,
    nombre: string,
    message: string,
    publishedAt: string,
    likes: Like[],
}

// Clase para manejar la respuesta
export class PostStore {
    data: Posts[] | null;
    addPost: (token: string, userId: string, message: string) => Promise<void> = async () => Promise.resolve();
    getPosts: (token: string) => Promise<void> = async () => Promise.resolve();
    setLike: (token:string, userId:string, postId: string) => Promise<void> = async () => Promise.resolve();
    setPostsData: (state: PostStore) => Promise<void> = async () => Promise.resolve();
    cleanPosts?: () => Promise<void> = async () => Promise.resolve();
    constructor(response: PostStore) {
        this.data = response.data;
    }
}