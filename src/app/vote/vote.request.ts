import {VoteTypeEnum} from "./vote-type.enum";

export class VoteRequest{
    voteType!: VoteTypeEnum;
    postId!: number;
}
