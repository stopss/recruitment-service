import { CompanyEntity } from 'src/company/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'job_postings' })
export class JobPostingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;

  @Column()
  position: string;

  @Column()
  reward: number;

  @Column()
  content: string;

  @Column()
  stack: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CompanyEntity, (company) => company.jobPosting)
  @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
  company: CompanyEntity;
}
