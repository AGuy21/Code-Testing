

export interface RepoFolder {
    download_url: string;
    url: string;        
    name: string;       
    path: string;       
    sha: string;       
    size: number;      
    type: 'file' | 'dir'; 
    _links: {
        git: string;
        html: string;
        self: string;
    }
}
