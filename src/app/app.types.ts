
export interface Repository {
    id: string;
    name: string;
    owner: RepositoryOwner;
    description: string;
    language?: string;
    svn_url: string;
    pushed_at: string;
    full_name: string;
}

export interface RepositoryOwner {
    login: string;
    avatar_url: string;
}

export interface RepositoryParams {
    owner: string;
    repo: string;
}

export interface QueryRepositoriesReponse {
    items: Repository[];
    total_count: number;
}

export type RepositoryDetailsReponse = Repository;
