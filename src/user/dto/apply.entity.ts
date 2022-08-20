import { JobPostingEntity } from 'src/job-posting/job-posting.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity({ name: 'apply_histories' })
export class ApplyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.applyHistory)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => JobPostingEntity, (jobPosting) => jobPosting.applyHistory)
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  jobPosting: JobPostingEntity;
}
