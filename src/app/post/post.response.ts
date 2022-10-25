export class PostResponse {
    postId!: number;
    postName!: string;
    text!: string;
    image: string = '';
    userName!: string;
    forumName!: string;
    voteCount!: number;
    commentCount!: number;
    created!: string;
    upVote!: boolean;
    downVote!: boolean;
}
