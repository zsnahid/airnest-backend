import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support')
export class SupportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uniqueId: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;
}
